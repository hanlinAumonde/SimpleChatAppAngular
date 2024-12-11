//对应springboot传来的分页数据的模型

// 通用的分页响应接口，使用泛型
export interface Page<T> {
    content: T[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

// 通用的排序接口
interface Sort {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  }
  
// 通用的分页请求信息接口
interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}
  
