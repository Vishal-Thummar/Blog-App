import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';


export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
  
    render={({field: {onChange}}) => (
        <Editor
        initialValue={defaultValue}
        apiKey='foy48kj34xiqdvosx0myl218n89s7kr4k9e8dmucrughbgnx'
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            language: "en",
            branding: false,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "fontsize",
                "textarea",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help | fontsize | language |openlink | link | unlink |anchor |casechange|checklist |addcomment|showcomments |",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }"
        }}
        onEditorChange={onChange}
        />
    )}
    />

     </div>
  )
}

