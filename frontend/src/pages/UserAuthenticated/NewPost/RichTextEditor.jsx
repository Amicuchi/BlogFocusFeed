import { forwardRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import PropTypes from "prop-types";
import styles from "./RichTextEditor.module.css";

// Função de validação de URL
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const RichTextEditor = forwardRef(({ onContentChange, initialValue = "" }, ref) => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false,
        text: false,
        bold: false,
        italic: false,
        heading: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Paragraph,
      Text,
      Bold,
      Italic,
      Heading.configure({
        levels: [1, 2, 3],
        HTMLAttributes: {
          class: 'heading',
        },
      }),
      BulletList,
      OrderedList,
      ListItem,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: initialValue,
    onUpdate: ({ editor }) => onContentChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: styles.editorClickAnywhere,
      },
    },
  });

  const toggleHeading = (level) => {
    if (editor.isActive('heading', { level })) {
      // Se o cabeçalho já está ativo, converte para parágrafo
      editor.chain().focus().setParagraph().run();
    } else {
      // Caso contrário, define o cabeçalho
      editor.chain().focus().setHeading({ level }).run();
    }
  };

  const openLinkModal = () => {
    setIsLinkModalOpen(true);
    setLinkUrl('');
  };

  const handleAddLink = () => {
    if (isValidUrl(linkUrl)) {
      editor
        .chain()
        .focus()
        .setLink({ href: linkUrl })
        .run();

      setIsLinkModalOpen(false);
      setLinkUrl('');
    } else {
      alert('Por favor, insira uma URL válida');
    }
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  if (!editor) return null;

  return (
    <div ref={ref}>
      {/* Barra de ferramentas */}
      <div className={styles.toolbar}>
        <button
          type="button"
          onClick={() => toggleHeading(1)}
          className={editor.isActive("heading", { level: 1 }) ? styles.activeButton : ""}
          aria-label="Título 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => toggleHeading(2)}
          className={editor.isActive("heading", { level: 2 }) ? styles.activeButton : ""}
          aria-label="Título 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? styles.activeButton : ""}
          aria-label="Lista de marcadores"
        >
          Lista
        </button>
        <button
          type="button"
          onClick={openLinkModal}
          aria-label="Adicionar link"
        >
          Link
        </button>
        <button
          type="button"
          onClick={removeLink}
          aria-label="Remover link"
        >
          Remover Link
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? styles.activeButton : ""}
          aria-label="Negrito"
        >
          Negrito
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? styles.activeButton : ""}
          aria-label="Itálico"
        >
          Itálico
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? styles.activeButton : ""}
          aria-label="Sublinhado"
        >
          Sublinhado
        </button>
      </div>

      {/* Área do editor */}
      <EditorContent
        editor={editor}
        className={styles.editor}
        data-placeholder="Digite o conteúdo aqui..."
      />

      {/* Modal de Link */}
      {isLinkModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Adicionar Link</h2>
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Digite a URL"
              aria-label="URL do link"
            />
            <div className={styles.modalActions}>
              <button onClick={handleAddLink}>Adicionar</button>
              <button onClick={() => setIsLinkModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

// Adicionar displayName ao componente
RichTextEditor.displayName = "RichTextEditor";

RichTextEditor.propTypes = {
  onContentChange: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
};

export default RichTextEditor;