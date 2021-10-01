import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting',
})
export class SortingPipe implements PipeTransform {
  transform(
    array: any[],
    field: string,
    order: 'asc' | 'dsc',
    SortType?: 'lstDgts',
    sortDig?: number
  ): any[] {
    if (SortType !== 'lstDgts') {
      return array.sort((a: any, b: any) =>
        a[field] < b[field]
          ? order == 'asc'
            ? -1
            : 1
          : order == 'asc'
          ? 1
          : -1
      );
    } else {
      return array.sort((a: any, b: any) =>
        a[field].substr(-sortDig || -3) - b[field].substr(-sortDig || -3) > 0
          ? order == 'asc'
            ? -1
            : 1
          : order == 'asc'
          ? 1
          : -1
      );
    }
  }
}
