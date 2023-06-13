import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import type { BoxProps, GridProps } from '@mui/material';
import { Grid as MuiGrid, useMediaQuery, useTheme } from '@mui/material';
import type { FC, ReactElement } from 'react';
import React, { useEffect, useState } from 'react';
import { Autoplay, Grid } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { createStyledAggerTheme } from '../../utils/Utility';
import { EditableTypography } from '../GenericEditableContent/EditableTypography';
import SectionBox from '../Utility/SectionBox';
import { useDepoimentoContentContext } from './DepoimentoContext';
import { EditableDepoimento } from './EditableDepoimento';

interface Props extends BoxProps {
  gridDefaultProps: GridProps;
}

const styled = createStyledAggerTheme();

const DepoimentosSection: FC<Props> = (props) => {
  const theme = useTheme();
  const upToLaptop = useMediaQuery(theme.breakpoints.up('laptop'));
  const upToPlanoMobile = useMediaQuery(theme.breakpoints.up('planoMobile'));
  const { depoimentoContent } = useDepoimentoContentContext();

  const SlidesItems = () => {
    const slides: ReactElement[] = [];

    depoimentoContent.depoimentos.map((depoimento) => {
      slides.push(
        <SwiperSlide key={`${depoimento.key}slide`}>
          <EditableDepoimento
            key={`${depoimento.key}editableDepoimento`}
            depoimento={depoimento}
          />
        </SwiperSlide>
      );
      return true;
    });

    return slides;
  };

  const [swiperHeight, setSwiperHeight] = useState(0);

  useEffect(() => {
    if (upToPlanoMobile) {
      const slides = document.querySelectorAll('.swiper-slide');
      let height = 0;

      slides.forEach((slide) => {
        height += slide.clientHeight;
      });

      height =
        height / 2 +
        document.querySelector('.swiper-slide:last-child')!.clientHeight;

      setSwiperHeight(height);
    }
  }, [depoimentoContent]);

  const StyledFormikTextField = styled(Swiper)(() => ({
    width: '100%',
    height: '100%',
    margin: '0 auto',
    '& .swiper-wrapper': {
      height: swiperHeight === 0 ? 'auto' : `${swiperHeight}px !important`,
    },
  }));

  return (
    <SectionBox
      component="section"
      bgcolor="primary.main"
      sx={{ overflow: 'hidden' }}
      id="depoimentos_section"
      py={2}
      {...props}
    >
      <MuiGrid {...props.gridDefaultProps}>
        <MuiGrid
          item
          xs={upToLaptop ? 8 : 12}
          sx={{
            overflow: 'hidden',
            maxHeight: '700px',
            WebkitMaskImage:
              'linear-gradient(180deg, transparent, #000 25%, #000 75%, transparent );',
            order: upToLaptop ? 0 : 1,
            alignItems: upToLaptop ? 'inherit' : 'center',
          }}
        >
          <StyledFormikTextField
            direction="vertical"
            slidesPerView="auto"
            grid={{
              rows: 2,
            }}
            spaceBetween={30}
            grabCursor
            freeMode={{
              enabled: true,
              sticky: false,
            }}
            pagination={{
              clickable: true,
            }}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            modules={[Grid, Autoplay]}
            className="depoimentos-swiper"
          >
            {SlidesItems()}
          </StyledFormikTextField>
        </MuiGrid>
        <MuiGrid
          item
          xs={upToLaptop ? 4 : 12}
          display="flex"
          justifyContent="center"
          sx={{
            flexDirection: 'column',
            alignItems: upToLaptop ? 'inherit' : 'center',
          }}
        >
          <EditableTypography
            text={depoimentoContent.texts[0]!}
            sx={{
              '& p, & span': {
                textAlign: upToPlanoMobile ? 'inherit' : 'center',
                paddingBottom: '20px',
              },
            }}
          />
          <EditableTypography
            text={depoimentoContent.texts[1]!}
            sx={{
              '& p, & span': {
                textAlign: upToPlanoMobile ? 'inherit' : 'center',
              },
            }}
          />
        </MuiGrid>
      </MuiGrid>
    </SectionBox>
  );
};

export default DepoimentosSection;
