export function JSON_to_URLEncoded(
  // deno-lint-ignore no-explicit-any
  element: any,
  key?: string,
  list?: string[]
) {
  const newList = list || [];
  if (typeof element == "object") {
    for (const idx in element) {
      const result = JSON_to_URLEncoded(
        element[idx],
        key ? key + "[" + idx + "]" : idx,
        list
      );
      newList.push(result);
    }
  } else {
    newList.push(key + "=" + encodeURIComponent(element));
  }
  return newList.join("&");
}
