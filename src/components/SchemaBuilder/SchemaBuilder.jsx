
import React, { useState } from 'react';
import { Card, Divider, Space, Typography, Button } from 'antd';
import { updateField, addField, deleteField, schemaToJson } from '../../utils/helpers';
import FieldList from './FieldList';

const { Title, Text } = Typography;

const SchemaBuilder = () => {
  const [schema, setSchema] = useState([]);

  const handleUpdateField = (id, key, value) => {
    setSchema(prevSchema => updateField(prevSchema, id, key, value));
  };

  const handleAddField = (parentId) => {
    setSchema(prevSchema => addField(prevSchema, parentId));
  };

  const handleDeleteField = (id) => {
    setSchema(prevSchema => deleteField(prevSchema, id));
  };

  const handleResetSchema = () => {
    setSchema([]);
  };

  return (
    <div className="flex p-6 h-screen gap-6 bg-gray-50">
      
      <div className="w-1/2 pr-3 overflow-y-auto">
        <Card 
          className="h-full shadow-sm border-0"
          bodyStyle={{ 
            padding: '20px',
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            borderRadius: '8px'
          }}
        >
          <div className="flex justify-between items-center mb-6">
            <Title level={3} className="m-0 text-gray-800 font-semibold">Schema Builder</Title>
            <Space>
              <Button 
                size="middle" 
                danger 
                onClick={handleResetSchema}
                className="hover:scale-105 transition-transform"
              >
                Clear All
              </Button>
            </Space>
          </div>
          
          <Divider className="mt-0 mb-4 bg-gray-200" />
          
          <div className="flex-1 overflow-y-auto pr-2">
            <FieldList
              fields={schema}
              onUpdateField={handleUpdateField}
              onAddField={handleAddField}
              onDeleteField={handleDeleteField}
              parentId={null}
            />
          </div>
        </Card>
      </div>
      
      
      <div className="w-1/2 pl-3 overflow-y-auto">
        <Card 
          className="h-full shadow-sm border-0" 
          bodyStyle={{ 
            padding: '20px', 
            height: '100%',
            borderRadius: '8px'
          }}
        >
          <div className="mb-2">
            <Title level={3} className="m-0 text-gray-800 font-semibold">Schema Definition</Title>
            <Text type="secondary" className="block text-gray-500">
              build your schema
            </Text>
          </div>
          
          <Divider className="mt-0 mb-4 bg-gray-200" />
          
          <div className="bg-gray-50 p-5 rounded-lg h-full overflow-auto border border-gray-200">
            {schema.length > 0 ? (
              <pre className="m-0 p-0">
                <code className="text-sm font-mono text-gray-700">
                  {JSON.stringify(schemaToJson(schema), null, 2)}
                </code>
              </pre>
            ) : (
              <div className="text-center text-gray-400 h-full flex flex-col items-center justify-center">
                <div className="max-w-xs">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-lg font-medium mb-1">No fields defined </p>
                 
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SchemaBuilder;