import React from 'react';
import { useTranslation } from 'react-i18next';
export default function LiveAnyway() {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="font-bold text-2xl mb-5">{t('Live anywhere')}</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 mb:grid-cols-2 sm:grid-cols-2 gap-5">
        <div className="col-span-1 mt-3">
          <img
            className="w-full h-full rounded-xl object-contaniner"
            src="https://cdn.shopify.com/s/files/1/0528/2565/3433/t/2/assets/pop_black_white-1643981162291_1200x.jpg?v=1643981163"
            alt=""
          />
          <h1 className="font-medium mt-2">{t('Pet Allowes')}</h1>
        </div>
        <div className="col-span-1 mt-3">
          <img
            className="w-full h-full rounded-xl object-cover"
            src="https://design-milk.com/images/2019/11/MyPetPoster-art-1.jpg"
            alt=""
          />
          <h1 className="font-medium mt-2">{t('Pet Allowes')}</h1>
        </div>
        <div className="col-span-1 mt-3">
          <img
            className="w-full h-full rounded-xl object-cover"
            src="https://cdn.shopify.com/s/files/1/0439/3533/4549/products/Watercolor-Product-image-Rightside-1pet-posteronly_4df085ae-8fb6-44cf-8c57-a851246cd504.jpg?v=1658839264"
            alt=""
          />
          <h1 className="font-medium mt-2">{t('Pet Allowes')}</h1>
        </div>
        <div className="col-span-1 mt-3">
          <img
            className="w-full h-full rounded-xl object-cover"
            src="https://ctl.s6img.com/society6/img/ZP5KtBY-qdxdks4lq1E7wJUWMVA/w_1500/posters/top/~artwork,fw_2719,fh_3620,fy_-3,iw_2718,ih_3624/s6-original-art-uploads/society6/uploads/misc/a91b21ea3cb84942a4423fcd9f9ee2f4/~~/black-and-white-happy-dog-posters.jpg"
            alt=""
          />
          <h1 className="font-medium mt-2">{t('Pet Allowes')}</h1>
        </div>
      </div>
    </div>
  );
}
