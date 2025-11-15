export default function UploadForm() {
  async function upload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const file = e.target.file.files[0];
    const form = new FormData();
    form.append("file", file);

    await fetch("/api/upload", {
      method: "POST",
      body: form,
    });
  }

  return (
    <form onSubmit={upload}>
      <input type="file" name="file" />
      <button type="submit">Upload File</button>
    </form>
  );
}
