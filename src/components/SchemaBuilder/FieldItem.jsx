import { Input, Select, Switch, Button, Card, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import FieldList from './FieldList';

const { Option } = Select;
const { Text } = Typography;

const FieldItem = ({ field, onUpdateField, onDeleteField, onAddField }) => {
  return (
    <Card 
      size="small" 
      className="mb-3 sm:mb-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
      bodyStyle={{ 
        padding: '12px sm:16px',
        borderRadius: '6px'
      }}
    >
      <div className="flex flex-col">
       
        <div className="flex flex-col sm:hidden gap-3 mb-3">
          <Input
            placeholder="Field name"
            value={field.name}
            onChange={(e) => onUpdateField(field.id, 'name', e.target.value)}
            className="w-full h-9 px-3 rounded-md border border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-colors"
            size="small"
          />
          
          <div className="flex items-center gap-2">
            <Select
              placeholder="Select type"
              value={field.type}
              onChange={(value) => onUpdateField(field.id, 'type', value)}
              className="flex-1 h-9 [&>.ant-select-selector]:h-9 [&>.ant-select-selector]:rounded-md [&>.ant-select-selector]:border-gray-300 [&>.ant-select-selector]:hover:border-blue-400"
              size="medium"
            >
              <Option value="string">String</Option>
              <Option value="number">Number</Option>
              <Option value="float">Float</Option>
              <Option value="boolean">Boolean</Option>
              <Option value="objectId">ObjectID</Option>
              <Option value="date">Date</Option>
              <Option value="nested">Nested Object</Option>
            </Select>
            
            <Button
              type="text"
              icon={<DeleteOutlined className="text-gray-500 hover:text-red-500 transition-colors" />}
              onClick={() => onDeleteField(field.id)}
              size="small"
              className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-md flex-shrink-0"
            />
          </div>
          
          <div className="flex items-center justify-center bg-gray-50 px-3 py-2 rounded-md border border-gray-200">
            <Text type="secondary" className="mr-2 text-xs font-medium">Required</Text>
            <Switch
              checked={field.required}
              onChange={(checked) => onUpdateField(field.id, 'required', checked)}
              size="small"
              className="[&>.ant-switch-handle]:before:bg-white"
            />
          </div>
        </div>

      
        <div className="hidden sm:flex items-center gap-3 mb-3 flex-wrap">
          <Input
            placeholder="Field name"
            value={field.name}
            onChange={(e) => onUpdateField(field.id, 'name', e.target.value)}
            className="flex-1 min-w-[140px] md:min-w-[180px] h-9 px-3 rounded-md border border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-colors"
            size="small"
          />
          
          <Select
            placeholder="Select type"
            value={field.type}
            onChange={(value) => onUpdateField(field.id, 'type', value)}
            className="w-[140px] md:w-[180px] h-9 [&>.ant-select-selector]:h-9 [&>.ant-select-selector]:rounded-md [&>.ant-select-selector]:border-gray-300 [&>.ant-select-selector]:hover:border-blue-400"
            size="medium"
          >
            <Option value="string">String</Option>
            <Option value="number">Number</Option>
            <Option value="float">Float</Option>
            <Option value="boolean">Boolean</Option>
            <Option value="objectId">ObjectID</Option>
            <Option value="date">Date</Option>
            <Option value="nested">Nested Object</Option>
          </Select>
          
          <div className="flex items-center bg-gray-50 px-3 py-1 rounded-md border border-gray-200">
            <Text type="secondary" className="mr-2 text-xs font-medium">Required</Text>
            <Switch
              checked={field.required}
              onChange={(checked) => onUpdateField(field.id, 'required', checked)}
              size="small"
              className="[&>.ant-switch-handle]:before:bg-white"
            />
          </div>
          
          <Button
            type="text"
            icon={<DeleteOutlined className="text-gray-500 hover:text-red-500 transition-colors" />}
            onClick={() => onDeleteField(field.id)}
            size="small"
            className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-md"
          />
        </div>
        
        {field.type === 'nested' && (
          <div className="ml-4 sm:ml-8 pl-3 sm:pl-4 border-l-2 border-gray-200 mt-3">
            <FieldList
              fields={field.children || []}
              onUpdateField={onUpdateField}
              onAddField={onAddField}
              onDeleteField={onDeleteField}
              parentId={field.id}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default FieldItem;