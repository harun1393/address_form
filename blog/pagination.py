from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination


class StudentLimitPageNumber(PageNumberPagination):
    page_size = 2,
    max_page_size = 5
    #default_limit = 2
    #max_limit = 5
