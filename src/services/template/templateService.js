import { database } from '../firebase/config';
import { ref, set, get, remove, child } from 'firebase/database';
import { BUILT_IN_TEMPLATES } from '../../constants/builtinTemplates';

const getTemplatesRef = (userId) => ref(database, `users/${userId}/templates`);
const getTemplateRef = (userId, templateId) => ref(database, `users/${userId}/templates/${templateId}`);

/**
 * Fetches all templates for a user, including the local Built-In templates.
 */
export const fetchUserTemplates = async (userId) => {
  const snapshot = await get(getTemplatesRef(userId));
  let userTemplates = [];
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    userTemplates = Object.keys(data).map(key => data[key]);
  }

  // Combine local built-ins with user's remote templates
  return [...BUILT_IN_TEMPLATES, ...userTemplates];
};

/**
 * Saves a new or updated template to Firebase.
 */
export const saveTemplate = async (userId, templateData) => {
  if (templateData.metadata.isBuiltIn) {
    throw new Error('Cannot overwrite a built-in template. Duplicate it first.');
  }

  const templateId = templateData.metadata.id || `tpl_${Date.now()}`;
  const timestamp = new Date().toISOString();

  const finalTemplate = {
    ...templateData,
    metadata: {
      ...templateData.metadata,
      id: templateId,
      updatedAt: timestamp,
      createdAt: templateData.metadata.createdAt || timestamp
    }
  };

  await set(getTemplateRef(userId, templateId), finalTemplate);
  return finalTemplate;
};

/**
 * Duplicates an existing template (built-in or custom).
 */
export const duplicateTemplate = async (userId, sourceTemplate) => {
  const duplicated = {
    ...sourceTemplate,
    metadata: {
      ...sourceTemplate.metadata,
      id: `tpl_${Date.now()}`,
      name: `${sourceTemplate.metadata.name} (Copy)`,
      isBuiltIn: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  };

  await set(getTemplateRef(userId, duplicated.metadata.id), duplicated);
  return duplicated;
};

/**
 * Deletes a template.
 */
export const deleteTemplate = async (userId, templateId) => {
  await remove(getTemplateRef(userId, templateId));
  return true;
};
