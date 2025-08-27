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
  const { themeMode, setTheme } = useTheme();
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
              onPress={() => setTheme('light')}
              active={themeMode === 'light'}
            />
            <ThemeCard
              title="Dark Mode"
              icon={MoonIcon}
              onPress={() => setTheme('dark')}
              active={themeMode === 'dark'}
            />
            <ThemeCard
              title="Auto"
              icon={SunMoonIcon}
              onPress={() => setTheme('system')}
              active={themeMode === 'system'}
            />
          </VStack>
        </VStack>
      </VStack>
    </PageWrapper>
  );
};

export default Settings;
