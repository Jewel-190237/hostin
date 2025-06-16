import { Form, Upload, Modal } from "antd";
import { useState } from "react";
import { useAction } from "../../helpers/hooks";
import { deleteFile } from "../../helpers/backend";

const MultipleImageInput = (props) => {
  let max = props.max || 1;
  let name = props.name || "img";
  let label = props.label;
  let children = props?.children;
  let onChange = props.onChange;
  let listType = props.listType || "picture-card";

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <Form.Item
        name={name}
        rules={[
          {
            required: props?.required,
            message: `${('Please upload')} ${!!label ? (label) : ("an image")}`,
          },
        ]}
      >
        <Input
          max={max}
          listType={listType}
          pdf={props?.pdf}
          noWebp={props?.noWebp}
          onChange={onChange}
          children={children}
        />
      </Form.Item>
    </div>
  );
};

const Input = ({ value, onChange, listType, max, noWebp, pdf, children }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }) => {
    if (max > 1) {
      const removedFiles = (value || []).filter(file => !fileList.includes(file));

      removedFiles.forEach(removedFile => {
        if (removedFile.url) {
          useAction(deleteFile, { file: removedFile.url });
        }
      });

    } else {
      if (fileList.length < (value?.length || 0)) {
        const removedFile = value.find(file => !fileList.includes(file));
        if (!!removedFile?.url) {
          useAction(
            deleteFile,
            { file: removedFile?.url },
          );
        }
      }

    }

    onChange(fileList);
  };

  return (
    <>
      <Upload
        accept={`image/png, image/gif, image/jpeg, ${!noWebp && "image/webp"}${pdf ? ", application/pdf" : ""
          }`}
        listType={listType}
        onPreview={handlePreview}
        fileList={value || []}
        onChange={handleChange}
        maxCount={max}
        action={null}
        beforeUpload={() => false}
      >
        {(value?.length || 0) < max && (children || `+ ${('upload')}`)}
      </Upload>
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={handleCancel}
        title={('Preview')}
      >
        {previewImage.endsWith(".pdf") ? (
          <embed
            src={previewImage}
            type="application/pdf"
            width="100%"
            height="600px"
          />
        ) : (
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        )}
      </Modal>
    </>
  );
};

export default MultipleImageInput;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

