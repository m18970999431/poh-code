import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showName'
})
@Injectable()
export class ShowName implements PipeTransform {
  /*
    Version 0.3 2017-08-15
   */
  transform(obj: any): string {
      let show = ""
      if(obj){
        if(obj.__type&&obj.__type=="Pointer"){ // When Pointer return ""
              return show  
        }
        if(obj.get("username")&&obj.get("username")!=""){
          show = obj.get("username")
        }
        if(obj.get("mobile")&&obj.get("mobile")!=""){
          show = obj.get("mobile")
        }
        if(obj.get("title")&&obj.get("title")!=""){
          show = obj.get("title")
        }
        if(obj.get("name")&&obj.get("name")!=""){
          show = obj.get("name")
        }
        if(obj.get("nickname")&&obj.get("nickname")!=""){
          show = obj.get("nickname")
        }
        if(obj.get("classNum")&&obj.get("classNum")!=""){
          show = obj.get("course").get("title") + obj.get("classNum")
        }
      }
      return show
  }
}
