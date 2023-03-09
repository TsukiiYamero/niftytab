import { StandardButton } from '@/ui/atoms/Buttons';
import './addTabs.css';
import { QuickSection } from './QuickSave/QuickSection';
import { CustomSaveTabs } from './CustomSave/CustomSaveTabs';
import { Modal, useModal } from '@/ui/molecules/Modal';
import { CloudUploadOutlined } from '@mui/icons-material';

export const AddTabs = () => {
    const { isOpen, closeModal, openModal } = useModal();

    return (
        <div>
            <StandardButton
                icon={<CloudUploadOutlined />}
                text={'Save'}
                onClick={() => openModal()}
            />

            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                modalClassSize={'modal-save-tabs-size'}
            >
                <div
                    style={{
                        padding: '36px 10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                    }}
                >
                    <QuickSection closeModal={closeModal}></QuickSection>

                    <div className='custom-line'>
                        <span>Or Custom</span>
                    </div>

                    <CustomSaveTabs></CustomSaveTabs>

                </div>
            </Modal>
        </div>
    );
};
