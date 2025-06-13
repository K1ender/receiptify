<script lang="ts" setup>
import CardPrice from "~/components/CardPrice.vue";
import CashewLinkBuilder from "~/utils/CashewLinkBuilder";
import type { ReceiptResponse } from "~~/shared/types";

const isDragging = ref(false);
const isLoading = ref(false);

const fileInput = useTemplateRef("fileInput");

const result = ref<ReceiptResponse | undefined>(undefined);

async function uploadFile(file: File) {
  const mimetype = file.type;

  if (mimetype !== "image/png" && mimetype !== "image/jpeg") {
    alert("Only PNG and JPEG files are allowed");
    throw new Error("Only PNG and JPEG files are allowed");
  }

  const formData = new FormData();
  formData.append("file", file);

  const res = await $fetch("/api/upload", {
    body: formData,
    method: "POST",
  });

  if (res.error) {
    throw new Error("You send not a real image");
  }

  result.value = res;
  console.log(CashewLinkBuilder("web", res));
}

async function handleDrop(e: DragEvent) {
  try {
    isDragging.value = false;
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (!file) return;
      await uploadFile(file);
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
    }
  } finally {
    isLoading.value = false;
  }
}

function onDragOver() {
  isDragging.value = true;
}

function onDragLeave() {
  isDragging.value = false;
}

function handleClick() {
  fileInput.value?.click();

}

function handleFileInput(e: Event) {
  if (e.target instanceof HTMLInputElement) {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (!file) return;
      uploadFile(file);
    }
  }
}
</script>

<template>
  <div class="hero">
    <div class="card upload-area" @click="handleClick" @drop.prevent="handleDrop" @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave">
      <Icon size="5rem" name="mdi:dropbox" />
      <p v-if="!isLoading">
        {{ isDragging ? "Feed me a file" : "Drag one file to this drop zone." }}
      </p>
      <p v-else>Loading...</p>
      <input ref="fileInput" type="file" hidden accept="image/png, image/jpeg" @change="handleFileInput">
    </div>

    <div class="card">
      <p>{{ result?.store.name ? result.store.name : "Result: " }}</p>
      <div class="result">
        <ul>
          <li v-for="item in result?.items" :key="item.id">
            <CardPrice :item="item" :currency="result?.currency" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  .card {
    width: 24rem;
    display: flex;
    align-items: center;
    flex-direction: column;

    border: 1px solid var(--text-color);
    border-radius: var(--card-rounded);
    padding: var(--padding-6);

    box-shadow: var(--card-shadow-x) var(--card-shadow-y) var(--card-shadow-blur) var(--card-shadow-spread) var(--card-shadow-color);
  }
}

.upload-area {
  cursor: pointer;
}

.result {
  width: 100%;
  padding-top: var(--padding-4);
}

ul {
  list-style: none;
  gap: 0.8rem;
  display: flex;
  flex-direction: column;
}
</style>
