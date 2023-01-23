const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const livrosPath = path.resolve(__dirname , "../database/livros.json")

function getLivros () {
 return JSON.parse(fs.readFileSync(livrosPath))
}

function saveLivros (livros) {
  fs.writeFileSync(livrosPath , JSON.stringify(livros , null , 4 ))
}

 router.get('/', (req,res)=>{
  let livros = getLivros()
res.render('biblioteca' ,  {livros:getLivros()})
})

 router.get('/adicionar',(req,res)=>{
  let livros = getLivros()
  res.render( 'adicionar-livros')
})

router.post('/', (req,res)=>{
  let livros = getLivros()
  livros.push({
    id:livros.at(-1).id+1 , 
    ...req.body
  })

  saveLivros(livros);
  res.redirect('/biblioteca')
})

router.delete('/deletar/:id',(req,res)=>{
   const id = req.params.id;
   let livros = getLivros()
   livros = livros.filter(livro => livro.id != id)

   saveLivros(livros)
   res.redirect('/biblioteca')

})

module.exports = router;