import React from 'react';
import { GavelIcon, LanguagesIcon, SunMoonIcon, UserIcon } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import ExpandableCard from '@/components/screens/settings/ExpandableCard';
import { SunIcon, MoonIcon } from '@/components/ui/icon';
import ThemeCard from '@/components/screens/settings/ThemeCard';
import { useTheme } from '@/contexts/ThemeContext';
import PageWrapper from '@/components/shared/PageWrapper';
import { Header } from '@/components/shared/Header';
import { useData } from '@/contexts/DataContext';
import RedirectCard from '@/components/screens/settings/RedirectCard';
import { Link, LinkText } from '@/components/ui/link';
import SelectCard from '@/components/screens/settings/SelectCard';

const Settings = () => {
  const { colorMode, setColorMode } = useTheme();
  const { supportedLanguages, language, changeLanguage } = useData();

  return (
    <PageWrapper>
      <Header title="Settings" />
      <VStack space="xl">
        <VStack className="px-4" space="md">
          <SelectCard
            placeholder={'Choose language'}
            value={language?.iso639}
            icon={LanguagesIcon}
            options={supportedLanguages}
            onValueChange={(e) => changeLanguage(e)}
          />
          <RedirectCard title={'Manage Subscription'} icon={UserIcon} />
          <ExpandableCard title={'Legal'} icon={GavelIcon}>
            <VStack space="md">
              <Link>
                <LinkText>View Terms of Service</LinkText>
              </Link>
              <Link>
                <LinkText>View Privacy Policy</LinkText>
              </Link>
              <Link>
                <LinkText>View Commercial Agreement</LinkText>
              </Link>
            </VStack>
          </ExpandableCard>
        </VStack>

        <VStack className="px-4" space="md">
          <Text className="font-semibold">Theme</Text>
          <VStack space="sm">
            <ThemeCard
              title="Light Mode"
              icon={SunIcon}
              onPress={() => setColorMode('light')}
              active={colorMode === 'light'}
            />
            <ThemeCard
              title="Dark Mode"
              icon={MoonIcon}
              onPress={() => setColorMode('dark')}
              active={colorMode === 'dark'}
            />
            <ThemeCard
              title="Auto"
              icon={SunMoonIcon}
              onPress={() => setColorMode('system')}
              active={colorMode === 'system'}
            />
          </VStack>
        </VStack>
      </VStack>
    </PageWrapper>
  );
};

export default Settings;
