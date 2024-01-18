import { IResult } from '@/app/interfaces/IResult';
import { IQuestion } from '@/app/interfaces/iQuestion';
import { IQuiz } from '@/app/interfaces/iQuiz';
import { GetQuestionsService } from '@/app/services/get-questions.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {

  questionario:number = 1
  quizz:IQuiz|null = null
  questoes: IQuestion[]|null = null
  resultados: IResult[]|null = null
  respostas:string[] = []
  comecou = false
  terminou = false

  titulo:string = "";
  questaoAtual: IQuestion|null = null
  opcoes: IQuestion["options"]|null = null
  indice:number = 0
  maxIndice:number = 0
  respostaQuizz:string=""

  constructor (private service:GetQuestionsService) {
  }

  ngOnInit(): void {
    this.quizz = this.service.getQuiz(this.questionario)
    if(this.quizz) {
      this.titulo = this.quizz.title
      this.questoes = this.quizz.questions
      this.indice = 0
      this.maxIndice = this.questoes.length
      this.questaoAtual = this.questoes[this.indice]
      this.opcoes = this.questaoAtual.options
      this.respostas=[]
      this.comecou=true
      this.terminou=false
    }
  }

  opcaoEscolhida(value:string) {
    this.respostas.push(value)
    console.log(this.respostas)
    this.proximoPasso()
  }

  proximoPasso () {
    this.indice++
    if (this.questoes && (this.indice < this.maxIndice)) {
      this.questaoAtual = this.questoes[this.indice]
      this.opcoes = this.questaoAtual.options
    } else {
      this.terminou=true
      const key = this.calculaResultado()
      const resposta = this.quizz?.results.find(item => item.key === key)?.value
      this.respostaQuizz = resposta? resposta : ""
    }
  }

  calculaResultado() {
    return this.respostas.reduce((acc, atual, i, arr) => {
      if(arr.filter(item => item === acc).length > arr.filter(item => item === atual).length) {
        return acc
      }
      return(atual)
    })
  }



}
