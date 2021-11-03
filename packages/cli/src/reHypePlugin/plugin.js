function crateNewSection() {
  return {
    type: "element",
    tagName: "section",
    properties: {
      classname: "slide",
    },
    children: [],
  };
}

export default function reHypeSlides() {
  return transformer;

  function transformer(tree) {
    const sections = [];
    let currentSection = crateNewSection();

    tree.children.forEach((node, index) => {
      if (node.tagName === "hr") {
        sections.push(currentSection);
        currentSection = crateNewSection();
      } else {
        currentSection.children.push(node);
      }
    });

    sections.push(currentSection);

    tree.children = sections;
  }
}
