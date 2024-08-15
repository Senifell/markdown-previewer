import React, { useState } from "react";
import "./App.css";
import { marked } from "marked";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  },
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

function App() {
  const initialValue = `# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, \`<div></div>\`, between 2 backticks.\n\n\`\`\`\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {\n    return multiLineCode;\n  }\n}\n\`\`\`\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)\n`;
  const [markdown, setMarkdown] = useState(initialValue);
  const [editorMaximized, setEditorMaximized] = useState(false);
  const [previewMaximized, setPreviewMaximized] = useState(false);

  const editorClass = editorMaximized
    ? "editorWrap maximized"
    : previewMaximized
    ? "editorWrap hide"
    : "editorWrap";
  const previewClass = previewMaximized
    ? "previewWrap maximized"
    : editorMaximized
    ? "previewWrap hide"
    : "previewWrap";
  const iconClass =
    editorMaximized || previewMaximized ? "fa fa-compress" : "fa fa-arrows-alt";

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handleEditorMaximize = () => {
    setEditorMaximized(!editorMaximized);
  };

  const handlePreviewMaximize = () => {
    setPreviewMaximized(!previewMaximized);
  };

  return (
    <div>
      <div className={editorClass}>
        <div className="toolbar">
          <i
            className="fa-brands fa-free-code-camp"
            title="no-stack-dub-sack"
          ></i>
          Editor
          <i className={iconClass} onClick={handleEditorMaximize}></i>
        </div>
        <textarea
          id="editor"
          type="text"
          value={markdown}
          onChange={handleChange}
        />
      </div>
      <div className="converter"></div>

      <div className={previewClass}>
        <div className="toolbar">
          <i
            className="fa-brands fa-free-code-camp"
            title="no-stack-dub-sack"
          ></i>
          Previewer
          <i className={iconClass} onClick={handlePreviewMaximize}></i>
        </div>
        <div
          id="preview"
          dangerouslySetInnerHTML={{ __html: marked(markdown, { renderer }) }}
        />
      </div>
    </div>
  );
}

export default App;
