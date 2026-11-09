// npm run check
import assert from "node:assert";
import { youtubeId } from "../src/utils/youtube.js";

const id = "dQw4w9WgXcQ";
for (const url of [
    `https://www.youtube.com/watch?v=${id}`,
    `https://www.youtube.com/watch?feature=share&v=${id}&t=10`,
    `https://youtu.be/${id}?si=abc`,
    `https://www.youtube.com/embed/${id}`,
    `https://www.youtube.com/shorts/${id}`,
]) assert.strictEqual(youtubeId(url), id, url);

for (const bad of [undefined, null, "", "https://example.com/watch?v=" + id, "https://www.youtube.com/"]) {
    assert.strictEqual(youtubeId(bad), null, String(bad));
}
console.log("ok");
