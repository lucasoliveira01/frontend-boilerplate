import React, { FC } from "react";
import { CKEditor as CKE } from "@ckeditor/ckeditor5-react";
import { EditableCSSProperties } from "../../../types/aggerTypes";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface Props {
    data: string;
    style?: EditableCSSProperties;
    onChange: (editorData: string) => void;
}

const CKEditor: FC<Props> = (props) => {
    const handleChange = (event: Event, editor: typeof ClassicEditor) => {
        props.onChange(editor.getData());
    };

    return (
        <CKE
            editor={ClassicEditor}
            data={props.data}
            config={{
                htmlSupport: {
                    allow: [
                        {
                            name: /.*/,
                            attributes: true,
                            classes: true,
                            styles: true,
                        },
                    ],
                },
                heading: {
                    options: [
                        {
                            model: "paragraph",
                            title: "Paragraph",
                            class: "ck-heading_paragraph",
                        },
                        {
                            model: "heading1",
                            view: "h1",
                            title: "Heading 1",
                            class: "ck-heading_heading1",
                        },
                        {
                            model: "heading2",
                            view: "h2",
                            title: "Heading 2",
                            class: "ck-heading_heading2",
                        },
                    ],
                },
                fontFamily: {
                    options: [
                        "Asap Regular",
                        "Asap Medium",
                        "Asap SemiBold",
                        "Asap Bold",
                        "K2D Thin",
                        "K2D ExtraLight",
                        "K2D Light",
                        "K2D Regular",
                        "K2D Medium",
                        "K2D SemiBold",
                        "K2D Bold",
                        "K2D ExtraBold",
                    ],
                },
                fontSize: {
                    options: [
                        {
                            title: "Pequeno",
                            model: "0.9rem",
                        },
                        {
                            title: "Texto, Profissão",
                            model: "1rem",
                        },
                        {
                            title: "Nome, Botão",
                            model: "1.1rem",
                        },
                        {
                            title: "Subtitulo",
                            model: "1.5rem",
                        },
                        {
                            title: "Titulo Seção",
                            model: "1.6rem",
                        },
                        {
                            title: "Médio",
                            model: "2rem",
                        },
                        {
                            title: "Titulo",
                            model: "2.9rem",
                        },
                        {
                            title: "Numero",
                            model: "4rem",
                        },
                        {
                            title: "Gigante",
                            model: "4.5rem",
                        },
                    ],
                },
            }}
            onChange={handleChange}
        />
    );
};

export default CKEditor;
