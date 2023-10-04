// this.isInDocument = function (range) {
//   let container = range.commonAncestorContainer;
//   while (container) {
//     if (container === document) {
//       return true;
//     }
//     container = container.parentNode;
//   }
//   return false;
// };
// if (startNode != null && endNode != null) {
//   let selection = document.getSelection();
//   if (selection == null) return;
//   if (selection != null) {
//     if (!this.hasFocus()) this.root.focus();
//     let native = (this.getNativeRange() || {}).native;
//     if (
//       native == null ||
//       force ||
//       startNode !== native.startContainer ||
//       startOffset !== native.startOffset ||
//       endNode !== native.endNode ||
//       endOffset !== native.endOffset
//     ) {
//       if (startNode.tagName == "BR") {
//         startOffset = [].indexOf.call(
//           startNode.parentNode.childNodes,
//           startNode
//         );
//         startNode = startNode.parentNode;
//       }
//       if (endNode.tagName == "BR") {
//         endOffset = [].indexOf.call(endNode.parentNode.childNodes, endNode);
//         endNode = endNode.parentNode;
//       }
//       let range = document.createRange();
//       range.setStart(startNode, startOffset);
//       range.setEnd(endNode, endOffset);
//       if (this.isInDocument(range)) {
//         selection.removeAllRanges();
//         selection.addRange(range);
//       }
//     }
//   } else {
//     selection.removeAllRanges();
//     this.root.blur();
//     document.body.focus();
//   }
// }
