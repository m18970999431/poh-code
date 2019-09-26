import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showImgPipe'
})
@Injectable()
export class ShowImg implements PipeTransform {
  /*
    Version 0.2 2017-03-21
   */
  transform(v: any): string {
    let url;
    if (typeof (v) == "string") return v;
    if (typeof (v) == "object") {
      if (v.length) {
        url = v[0].url
        return url;
      } else {
        for (let i in v) {
          url = v[i].url
        }
        return url;
      }
    }
  }
}
