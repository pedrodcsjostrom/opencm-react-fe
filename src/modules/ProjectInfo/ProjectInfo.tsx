import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/root-reducer';
import { getFontStyles } from '../../components/design-system/Typography';
import { formatDate } from '../../utils';
import { useState, useEffect } from 'react';
import { publisherApi } from '../../api/publisher/publisher-api';
import { Publisher } from '../../api/publisher/types';
import Button from '../../components/design-system/Button';
import IconPlus from '../../assets/icons/Plus';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import {
  enablePlatform,
  getDefaulUserPlatformInfo,
  removePostingTimeSlot,
  setSelectedProject,
} from '../../store/projects/projectSlice';
import PlatformInfo from './PlatformInfo';
import { openModal } from '../../store/modal/modalSlice';
import TeamList from './TeamList';
import IconClose from '../../assets/icons/Close';
import { TimeSlot } from '../../api/project/types';

const FloatingMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  background-color: ${(props) => props.theme.bgColors.primary};
  border: 1px solid ${(props) => props.theme.dividerColor};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 16px;
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${(props) => props.theme.textColors.primary};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.bgColors.secondary};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.dividerColor};
  }
`;

const ButtonWrapper = styled.div`
  position: relative;
`;

const ContentArea = styled.div`
  padding: 24px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: ${(props) => props.theme.textColors.primary};
  ${({ theme }) => getFontStyles('sb_24')(theme)};
`;

const InfoCard = styled.div`
  background-color: ${(props) => props.theme.bgColors.secondary};
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
`;

const InfoSection = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  color: ${(props) => props.theme.textColors.primary};
  ${({ theme }) => getFontStyles('m_16')(theme)};
  margin-bottom: 16px;
`;

const Description = styled.p`
  color: ${(props) => props.theme.textColors.secondary};
  ${({ theme }) => getFontStyles('r_14')(theme)};
  margin-bottom: 8px;
`;

const DateInfo = styled.div`
  color: ${(props) => props.theme.textColors.secondary};
  ${({ theme }) => getFontStyles('r_12')(theme)};
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tab = styled.div<{ $isActive: boolean }>`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${(props) => props.theme.textColors.primary};
  background: ${(props) => (props.$isActive ? props.theme.bgColors.primary : 'transparent')};
  border: 1px solid ${(props) => props.theme.dividerColor};

  &:hover {
    background: ${(props) => props.theme.bgColors.primary};
  }
`;

const PlatformContent = styled.div`
  background: ${(props) => props.theme.bgColors.primary};
  border: 1px solid ${(props) => props.theme.dividerColor};
  border-radius: 4px;
  padding: 24px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const TimeSlotList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TimeSlotItem = styled.div`
  padding: 12px;
  background: ${(props) => props.theme.bgColors.primary};
  border: 1px solid ${(props) => props.theme.dividerColor};
  border-radius: 4px;
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${(props) => props.theme.textColors.primary};
  position: relative;

  &:hover {
    .remove-button {
      opacity: 1;
    }
  }
`;

const RemoveButton = styled(Button)`
  position: absolute;
  top: 8px;
  right: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
  padding: 4px;
  height: auto;
  min-width: auto;
`;

const HeaderWithAction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ProjectInfo: React.FC = () => {
  const { activeProject, team, projectSchedule } = useSelector((state: RootState) => state.project);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [availablePlatforms, setPlatfroms] = useState<Publisher[]>([]);
  const enabledPlatforms = useSelector((state: RootState) => state.project.enabledPlatforms);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const isDefaultUser = team.some((member) => member.id === user.id && member.defaultUser);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchPublishers = async () => {
      const availablePlatforms = await publisherApi.getAvailablePublishers();
      setPlatfroms(availablePlatforms || []);
    };
    if (isMenuOpen) {
      fetchPublishers();
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (activeProject.id) {
      dispatch(setSelectedProject(activeProject.id));
    }
  }, [activeProject.id]);

  useEffect(() => {
    if (!activeTab && enabledPlatforms.length > 0) {
      setActiveTab(enabledPlatforms[0].id);
    }
    if (activeTab && activeProject.id) {
      dispatch(getDefaulUserPlatformInfo(activeProject.id, activeTab));
    }
  }, [activeTab]);

  const handlePublisherSelect = (publisher: Publisher) => {
    dispatch(enablePlatform(activeProject.id, publisher.id));
    setIsMenuOpen(false);
  };

  const handleAddTimeSlot = () => {
    dispatch(openModal({ type: 'ADD_TIME_SLOT' }));
  };

  const sortTimeSlots = (a: TimeSlot, b: TimeSlot): number => {
    // First compare by day of week
    if (a.dayOfWeek !== b.dayOfWeek) {
      return a.dayOfWeek - b.dayOfWeek;
    }
    // If same day, compare by hour
    if (a.hour !== b.hour) {
      return a.hour - b.hour;
    }
    // If same hour, compare by minute
    return a.minute - b.minute;
  };

  return (
    <ContentArea>
      <TitleContainer>
        <Title>{activeProject.name}</Title>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="off" onClick={() => dispatch(openModal({ type: 'EDIT_PROJECT' }))}>
            Edit
          </Button>
          <Button
            variant="off"
            onClick={() => dispatch(openModal({ type: 'CONFIRM_DELETE_PROJECT' }))}
          >
            Delete
          </Button>
        </div>
      </TitleContainer>

      <InfoCard>
        <InfoSection>
          <SectionTitle>Project Description</SectionTitle>
          <Description>{activeProject.description || 'No description provided.'}</Description>
        </InfoSection>

        <InfoSection>
          <SectionTitle>Project Details</SectionTitle>
          <DateInfo>Created: {formatDate(activeProject.createdAt)}</DateInfo>
          <DateInfo>Last Updated: {formatDate(activeProject.updatedAt)}</DateInfo>
        </InfoSection>
      </InfoCard>

      <InfoCard>
        <InfoSection>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <SectionTitle>Team Members</SectionTitle>
            <Button
              variant="off"
              icon={<IconPlus />}
              onClick={() => dispatch(openModal({ type: 'ADD_USER' }))}
            >
              Add Member
            </Button>
          </div>
          <TeamList />
        </InfoSection>
      </InfoCard>

      <InfoCard>
        <InfoSection>
          <HeaderWithAction>
            <SectionTitle>Publishing Schedule</SectionTitle>
            <Button variant="off" icon={<IconPlus />} onClick={handleAddTimeSlot}>
              Add Time Slot
            </Button>
          </HeaderWithAction>

          {projectSchedule ? (
            <>
              <Description>
                Time Margin: {projectSchedule.timeMargin / 60000000000} minutes
              </Description>
              <TimeSlotList>
                {projectSchedule.slots
                  .slice()
                  .sort(sortTimeSlots)
                  .map((slot, index) => (
                    <TimeSlotItem key={index}>
                      <RemoveButton
                        className="remove-button"
                        variant="off"
                        icon={<IconClose size={16} />}
                        onClick={() => {
                          const date = new Date(
                            Date.UTC(2024, 0, 7 + slot.dayOfWeek, slot.hour, slot.minute)
                          );
                          dispatch(removePostingTimeSlot(activeProject.id, date));
                        }}
                      />
                      {`${
                        slot.dayOfWeek === 0
                          ? 'Sunday'
                          : slot.dayOfWeek === 1
                            ? 'Monday'
                            : slot.dayOfWeek === 2
                              ? 'Tuesday'
                              : slot.dayOfWeek === 3
                                ? 'Wednesday'
                                : slot.dayOfWeek === 4
                                  ? 'Thursday'
                                  : slot.dayOfWeek === 5
                                    ? 'Friday'
                                    : 'Saturday'
                      } at ${(() => {
                        const date = new Date(
                          Date.UTC(2024, 0, 7 + slot.dayOfWeek, slot.hour, slot.minute)
                        );
                        const localHour = date.getHours();
                        const localMinute = date.getMinutes();
                        return `${String(localHour).padStart(2, '0')}:${String(localMinute).padStart(2, '0')}`;
                      })()}`}
                    </TimeSlotItem>
                  ))}
              </TimeSlotList>
            </>
          ) : (
            <Description>No publishing schedule configured.</Description>
          )}
        </InfoSection>
      </InfoCard>

      <InfoCard>
        <InfoSection>
          <SectionTitle>Enabled Platforms</SectionTitle>
          <TabsContainer>
            {enabledPlatforms.map((platform) => (
              <Tab
                key={platform.id}
                $isActive={activeTab === platform.id}
                onClick={() => setActiveTab(platform.id)}
              >
                {platform.name}
              </Tab>
            ))}
            <ButtonWrapper>
              <Button
                variant="off"
                icon={<IconPlus />}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              <FloatingMenu $isOpen={isMenuOpen}>
                {availablePlatforms.map((publisher) => (
                  <MenuItem key={publisher.id} onClick={() => handlePublisherSelect(publisher)}>
                    {publisher.name}
                  </MenuItem>
                ))}
              </FloatingMenu>
            </ButtonWrapper>
          </TabsContainer>

          {activeTab && (
            <PlatformContent>
              {enabledPlatforms.map((platform) => {
                if (platform.id !== activeTab) return null;
                return (
                  <PlatformInfo
                    key={platform.id}
                    platform={platform}
                    isDefaultUser={isDefaultUser}
                  />
                );
              })}
            </PlatformContent>
          )}
        </InfoSection>
      </InfoCard>
    </ContentArea>
  );
};

export default ProjectInfo;
