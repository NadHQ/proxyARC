from src.core.serializer import BaseSerializer


class ProxyBaseSerializer(BaseSerializer):
    id: str
    url: str
    max_of_requests: int


class ProxyGetSerializer(BaseSerializer):
    url: str
    max_of_requests: int


class ProxyStatisticsSerializer(ProxyGetSerializer):
    used_requests: int
