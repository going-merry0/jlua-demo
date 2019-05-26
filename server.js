const express = require("express");
const cors = require("cors");
const lexer = require("jlua/lib/lexer");
const Lexer = lexer.Lexer;
const Source = lexer.Source;
const Parser = require("jlua/lib/parser").Parser;
const YamlVisitor = require("jlua/lib/visitor").YamlVisitor;
const compile = require("jlua/lib/js/compile").default;

const port = 8081;
const app = express();

app.use(cors());
app.use(express.json());

app.post("/ast", (req, res) => {
  const src = new Source(req.body.code, "stdin");
  const lexer = new Lexer(src);
  const parser = new Parser(lexer);
  const chk = parser.parseChunk();
  const v = new YamlVisitor();
  const ast = v.visitChunk(chk);
  res.send({
    code: 0,
    data: ast
  });
});

app.post("/js", (req, res) => {
  const { code } = compile(req.body.code, "stdin");
  res.send({
    code: 0,
    data: code
  });
});

app.listen(port, () =>
  console.log(`Compiling service is listening on port ${port}!`)
);
