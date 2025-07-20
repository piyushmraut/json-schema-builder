import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FieldItem from './FieldItem';

const FieldList = ({ fields, onUpdateField, onAddField, onDeleteField, parentId = null }) => {
  return (
    <div>
      {fields.map(field => (
        <FieldItem
          key={field.id}
          field={field}
          onUpdateField={onUpdateField}
          onAddField={onAddField}
          onDeleteField={onDeleteField}
        />
      ))}
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={() => onAddField(parentId)}
        className="mt-2 w-full"
        size="small"
      >
        Add Field
      </Button>
    </div>
  );
};

export default FieldList;