import React from 'react';
import { useSelector } from 'react-redux';
import { selectModal } from '../../store/modal/modalSlice';
import CreateProjectModal from './CreateProjectModal';
import CreatePostModal from './CreatePostModal';
import UploadMediaModal from './UploadMediaModal';
import SchedulePostModal from './SchedulePostModal';
import EditPostModal from './EditPostModal';
import EditProjectModal from './EditProjectModal';
import AddUserModal from './AddUserModal';
import ConfirmRemoveUserModal from './ConfirmRemoveUserModal';
import ConfirmDeleteProjectModal from './ConfirmDeleteProjectModal';
import AddRoleModal from './AddRoleModal';
import RemoveRoleModal from './RemoveRoleModal';
import AddTimeSlotModal from './AddTimeSlotModal';

const MODAL_COMPONENTS: Record<string, React.ComponentType<any>> = {
  CREATE_PROJECT: CreateProjectModal,
  CREATE_POST: CreatePostModal,
  UPLOAD_MEDIA: UploadMediaModal,
  SCHEDULE_POST: SchedulePostModal,
  EDIT_POST: EditPostModal,
  EDIT_PROJECT: EditProjectModal,
  ADD_USER: AddUserModal,
  CONFIRM_REMOVE_USER: ConfirmRemoveUserModal,
  CONFIRM_DELETE_PROJECT: ConfirmDeleteProjectModal,
  ADD_ROLE: AddRoleModal,
  REMOVE_ROLE: RemoveRoleModal,
  ADD_TIME_SLOT: AddTimeSlotModal,
};

const ModalManager: React.FC = () => {
  const { isOpen, type, props } = useSelector(selectModal);

  if (!isOpen || !type) {
    return null;
  }

  const ModalComponent = MODAL_COMPONENTS[type as keyof typeof MODAL_COMPONENTS];
  return ModalComponent ? <ModalComponent {...props} /> : null;
};

export default ModalManager;
