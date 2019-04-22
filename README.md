## BEM blocks

Модификация утилиты, написанная компанией [CSSSSR](https://github.com/CSSSR/csssr-project-template)
для создания файловой БЭМ структуры с помощью emmet'о подбоного синтаксиса.

Пример: 

`header+main>(home+about)+footer`

Преобразуется в иерархическую структуру:
```
1 header
2 main
      2.1 home
      2.2 about
3 footer
```

