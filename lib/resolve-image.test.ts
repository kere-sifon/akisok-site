import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  CLOUDINARY_FOLDER,
  createImageResolver,
  placeholderImage,
} from "./resolve-image";

describe("createImageResolver", () => {
  it("returns the Cloudinary secure_url when the resource exists", async () => {
    const resolveImage = createImageResolver(async (publicId) => {
      assert.equal(publicId, `${CLOUDINARY_FOLDER}/hero-ibom-coast`);
      return {
        secure_url:
          "https://res.cloudinary.com/demo/image/upload/akisok/hero-ibom-coast.jpg",
      };
    });

    const resolved = await resolveImage("hero-ibom-coast");
    assert.equal(resolved.isPlaceholder, false);
    assert.equal(
      resolved.src,
      "https://res.cloudinary.com/demo/image/upload/akisok/hero-ibom-coast.jpg",
    );
  });

  it("falls back to the local placeholder when lookup fails", async () => {
    const resolveImage = createImageResolver(async () => {
      throw new Error("not found");
    });

    const resolved = await resolveImage("missing-key");
    assert.deepEqual(resolved, placeholderImage("missing-key"));
    assert.equal(resolved.isPlaceholder, true);
    assert.equal(resolved.src, "/images/placeholders/missing-key.jpg");
  });

  it("does not throw when credentials/network fail", async () => {
    const resolveImage = createImageResolver(async () => {
      throw new Error("Missing required parameter - api_key");
    });

    await assert.doesNotReject(() => resolveImage("any-key"));
  });

  it("caches by key so the same key is looked up once", async () => {
    let calls = 0;
    const resolveImage = createImageResolver(async () => {
      calls += 1;
      return {
        secure_url: "https://res.cloudinary.com/demo/image/upload/shared.jpg",
      };
    });

    const [a, b] = await Promise.all([
      resolveImage("pillar-places"),
      resolveImage("pillar-places"),
    ]);

    assert.equal(calls, 1);
    assert.equal(a.src, b.src);
    assert.equal(a.isPlaceholder, false);
  });
});
