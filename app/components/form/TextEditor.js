'use client';

import { Form } from 'antd';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

const TextEditor = ({
  value = "",
  name,
  label,
  height,
  required = false,
  placeholder = '',
  onChange
}) => {
  const handleQuillChange = (content) => {
    if (onChange) {
      onChange(content);
    }
  };

  useEffect(() => {
    const quillContainers = document.querySelectorAll('.ql-container');
    quillContainers.forEach((container) => {
      container.style.minHeight = height ? height : '300px';
      container.style.height = '100% !important';
    });
  }, [height]);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Form.Item name={name} noStyle>
        <ReactQuill
          theme="snow"
          value={value}
          placeholder={placeholder}
          onChange={handleQuillChange}
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            minHeight: height ? height : '300px',
            fontSize: '16px',
            position: 'relative',
          }}
        />
      </Form.Item>
    </div>
  );
};

export default TextEditor;