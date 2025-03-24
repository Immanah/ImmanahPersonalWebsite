import { createContext, useContext, useState, ReactNode } from 'react';
import { ProfileType } from "@shared/schema";
import { ProfileData } from '@/lib/types';

interface ProfileContextType {
  selectedProfile: ProfileType | null;
  setSelectedProfile: (profile: ProfileType | null) => void;
  profileData: ProfileData | null;
  setProfileData: (data: ProfileData | null) => void;
}

const ProfileContext = createContext<ProfileContextType>({
  selectedProfile: null,
  setSelectedProfile: () => {},
  profileData: null,
  setProfileData: () => {},
});

export const useProfile = () => useContext(ProfileContext);

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  return (
    <ProfileContext.Provider value={{ 
      selectedProfile, 
      setSelectedProfile,
      profileData,
      setProfileData,
    }}>
      {children}
    </ProfileContext.Provider>
  );
};
