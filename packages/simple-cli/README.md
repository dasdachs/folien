# simple-cli

A simple proof-of-concept app to make a cli for transforming _markdown_ to standalone pages _html_.

## How it works

It uses a basic [unified](https://unifiedjs.com/) pipeline to transform from `remark` to `rehype` and hooks into
the `rehype` pipeline to group elements within `horizontal breaks`.
