import { Injectable } from '@angular/core';
import { quizizz as extQuizz } from "assets/data/quizz_questions.json";
import { IQuiz } from '../interfaces/iQuiz';


@Injectable({
  providedIn: 'root'
})
export class GetQuestionsService {

  quizizz:IQuiz[]

  constructor() {
    this.quizizz = extQuizz
  }
  getQuiz(id: number): IQuiz|null {
    const quiz = this.quizizz.find(q => q.id === id)
    if (quiz) {
      return quiz
    }
    return null
  }
}
