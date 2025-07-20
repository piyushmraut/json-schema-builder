export const updateField = (schema, id, key, value) => {
  return schema.map(field => {
    if (field.id === id) {
      return { ...field, [key]: value };
    } else if (field.children) {
      return { ...field, children: updateField(field.children, id, key, value) };
    }
    return field;
  });
};


export const addField = (schema, parentId) => {
  const newField = { 
    id: Date.now().toString(), 
    name: '', 
    type: 'string',
    required: false 
  };
  
  if (parentId === null) {
    return [...schema, newField];
  }
  
  return schema.map(field => {
    if (field.id === parentId) {
      return { 
        ...field, 
        children: [...(field.children || []), newField] 
      };
    } else if (field.children) {
      return { 
        ...field, 
        children: addField(field.children, parentId) 
      };
    }
    return field;
  });
};


export const deleteField = (schema, id) => {
  return schema.filter(field => field.id !== id).map(field => {
    if (field.children) {
      return { ...field, children: deleteField(field.children, id) };
    }
    return field;
  });
};


export const schemaToJson = (fields) => {
  const result = {};
  fields.forEach(field => {
    if (field.name) {
      if (field.type === 'nested') {
        result[field.name] = schemaToJson(field.children || []);
      } else {
        result[field.name] = field.type;
      }
    }
  });
  return result;
};