import { IResult } from "./IResult";
import { IQuestion } from "./iQuestion";

export interface IQuiz {
  id:number,
  title:string,
  questions:IQuestion[],
  "results":IResult[]
}
