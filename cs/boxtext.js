
function boxText(box, container, spacing, textShift){
  var spans = [];
  var heights = [];
  var itemWidths = [];
  var lines = box.children;

  for(var i = 0; i < lines.length; i++){
    var elements = lines[i].children;

    spans.push([]);
    heights.push(elements[0].offsetHeight);
    itemWidths.push([]);

    for(var j = 0; j < elements.length; j++){
      spans[i].push(elements[j]);
      var width = elements[j].offsetWidth;
      itemWidths[i].push(width);
    }
  }
  console.log(itemWidths);

  var lineWidths = [];
  for(var i = 0; i < itemWidths.length; i++){
    lineWidths.push(0);
    for(var j = 0; j < itemWidths[i].length; j++){
      lineWidths[i] += itemWidths[i][j];
    }
  }

  var maxWidth = 0;
  for(var i = 0; i < spans.length; i++){
    maxWidth = Math.max(maxWidth, lineWidths[i]);
  }

  if(!Array.isArray(spacing)){
    var s = [];
    for(var i = 0; i < heights.length - 1; i++){
      s.push(spacing);
    }
    spacing = s;
  }
  spacing.push(0);

  var height = 0;
  var vertOffsets = [];
  for(var i = 0; i < heights.length; i++){
    vertOffsets.push(height - heights[i] * textShift);
    height += spacing[i] + heights[i];
  }

  var horzOffsets = [];
  for(var i = 0; i < itemWidths.length; i++){
    horzOffsets.push([]);
    if(itemWidths[i].length === 1){
      horzOffsets[i].push((maxWidth - lineWidths[i]) / 2);
    } else {
      var space = (maxWidth - lineWidths[i]) / (itemWidths[i].length - 1);
      var offset = 0;
      for(var j = 0; j < spans[i].length; j++){
        horzOffsets[i].push(offset);
        offset += itemWidths[i][j] + space;
      }
    }
  }

  for(var i = 0; i < spans.length; i++){
    for(var j = 0; j < spans[i].length; j++){
      spans[i][j].style.top = vertOffsets[i];
      spans[i][j].style.left = horzOffsets[i][j];
    }
  }

  function resize(){
    var dims = [container.clientWidth, container.clientHeight];
    box.style.left = ((dims[0] - maxWidth) / 2) + 'px';
    box.style.top = ((dims[1] - height) / 2) + 'px';
  }

  resize();
  return resize;
}

boxText(pages['front'].children[0], pages['front'], [4, 1], 0);
