import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import content from "@/public/data/content.json";

const SimpleEditorPage = () => {
  return (
    <SimpleEditor
      showThemeToggle={true}
      content={content}
      className="outer-editor-content"
    />
  );
};

export default SimpleEditorPage;
