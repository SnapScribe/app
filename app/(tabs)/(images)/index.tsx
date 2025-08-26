import React from 'react';
import { useData } from '@/contexts/DataContext';
import CategoryCard from '@/components/screens/images/CategoryCard';
import PageWrapper from '@/components/shared/PageWrapper';
import { Header } from '@/components/shared/Header';
import { Category } from '@/types';
import { Grid, GridItem } from '@/components/ui/grid';

const Images = () => {
  const { categories } = useData();

  return (
    <PageWrapper>
      <Header title="Items" />

      <Grid
        className="gap-2"
        _extra={{
          className: "grid-cols-12",
        }}
      >
        {categories.map((category: Category) => {
          return (
            <GridItem
              className="p-1 rounded-md"
              _extra={{
                className: 'col-span-12 sm:col-span-6 md:col-span-4',
              }}
              key={category.id}
            >
              <CategoryCard
                id={category.id}
                emoji={category.emoji}
                text={category.name}
              />
            </GridItem>
          );
        })}
      </Grid>
    </PageWrapper>
  );
};

export default Images;
