/**
 * Returns a list of shapes to draw.
 */
export function generateOperations(instructions: string, opts: any) {
  const size = opts?.size || 1000;
  let CELLSIZE = size / 64;

  let x = 0;
  let y = 0;
  const elements = [];
  for (const c of instructions) {
    if (c == '-' || c == '+') {
      elements.push(["line", {
        x1: x*CELLSIZE,
        y1: (y*CELLSIZE)+CELLSIZE/2,
        x2: (x+1)*CELLSIZE,
        y2: (y*CELLSIZE)+CELLSIZE/2
      }]);
    }
    if (c == '|' || c == '+') {
      elements.push(["line", {
        x1: x*CELLSIZE+(CELLSIZE/2),
        y1: (y*CELLSIZE),
        x2: x*CELLSIZE+(CELLSIZE/2),
        y2: (y+1)*CELLSIZE
      }]);
    }

    // else if (c == '/') {
    //   line(x*CELLSIZE, (y*CELLSIZE)+CELLSIZE, (x+1)*CELLSIZE, (y*CELLSIZE))
    // }

    x++;
    if (x==64) {
      x = 0;
      y++;
    }
  }


  return [elements, CELLSIZE];
}


/**
 * Output the drawing instructions as an SVG.
 */
export function asSVG(instructions: string, opts?: any) {
  const fullSize = opts?.size || 800;
  const contentSize = opts?.margin ? fullSize - opts?.margin*2 : fullSize;

  const [operations, cellsize] = generateOperations(instructions, {size: contentSize});

  const elements = [];
  for (const [command, args] of operations) {
    const attributeStr = Object.entries(args).map(([key, value]) => (`${key}="${value}"`)).join(' ')
    elements.push(`<${command} ${attributeStr} />`);
  }

  // Put SVG code together
  let svgCode = `${elements.join('\n')}`;
  if (opts?.margin) {
    svgCode = `<g transform="translate(${opts?.margin} ${opts?.margin})">${svgCode}</g>`;
  }
  svgCode = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${fullSize} ${fullSize}" className="${opts?.className ?? ''}" data-cellsize="${cellsize}">${svgCode}</svg>`;

  return svgCode;
}
