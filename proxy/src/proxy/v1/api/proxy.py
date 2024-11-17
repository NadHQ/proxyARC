from typing import List

import httpx
from config import get_app_config
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import Response
from src.proxy.constants import WINDOW_SIZE
from src.proxy.selectors.proxy import (
    create_url,
    get_max_requests,
    get_url_statistics,
    get_urls,
    rate_limiter,
    update_urls_data,
)
from src.proxy.v1.serializer.proxy import (
    ProxyBaseSerializer,
    ProxyGetSerializer,
    ProxyStatisticsSerializer,
)

proxy_router = APIRouter()


@proxy_router.get("/get/urls", response_model=List[ProxyBaseSerializer])
async def get_all_urls():
    result = await get_urls()
    return result


@proxy_router.put("/update/urls", response_model=ProxyBaseSerializer)
async def update_url(data: ProxyBaseSerializer):
    result = await update_urls_data(data.model_dump())
    return result


@proxy_router.post("/add/url", response_model=ProxyBaseSerializer)
async def add_url(data: ProxyGetSerializer):
    result = await create_url(data.model_dump())
    return result


@proxy_router.get(
    "/get/urls/statistics", response_model=List[ProxyStatisticsSerializer]
)
async def get_statistics():
    result = await get_url_statistics()
    return result


@proxy_router.api_route(
    "/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"]
)
async def proxy(request: Request, path: str):
    target_url = f"{get_app_config().target_server}/{path}"
    print(path)
    headers = dict(request.headers)
    headers.pop("host", None)
    result_path = path.split("MapServer")[0] + "MapServer"
    max_requests = await get_max_requests(path=result_path)
    allowed, retry_after = await rate_limiter(
        path=result_path, max_requests=max_requests, window_size=WINDOW_SIZE
    )
    if allowed:
        async with httpx.AsyncClient() as client:
            proxy_request = {
                "method": request.method,
                "url": target_url,
                "headers": headers,
                "params": dict(request.query_params),
                "content": await request.body(),
            }
            response = await client.request(**proxy_request)

        exclude_headers = {
            "content-encoding",
            "transfer-encoding",
            "content-length",
            "connection",
        }
        response_headers = {
            k: v
            for k, v in response.headers.items()
            if k.lower() not in exclude_headers
        }

        return Response(
            content=response.content,
            status_code=response.status_code,
            headers=response_headers,
            media_type=response.headers.get("Content-Type"),
        )
    else:
        raise HTTPException(
            status_code=429, detail=f"Retry after {retry_after} seconds"
        )
