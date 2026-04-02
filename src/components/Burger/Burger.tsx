import { useState } from 'react'
import './Burger.scss';
import TopBurger from './../../assets/ingredients/top_bun.png';
import BottomBurger from './../../assets/ingredients/bottom_bun.png';
import Checkout from '../Checkout/Checkout';
import useBuilder from '../../hooks/useBuilder';
import { dataOfProduct } from '../../mockedData';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

export default function Burger() {
  const { t } = useTranslation();
  const [checkout, setCheckout] = useState(false);
  const { stateBuilder, resetBuilder } = useBuilder();

  const sequence = stateBuilder?.sequence || [];
  const totalPrice = stateBuilder?.totalPrice || 0;
  const totalKkal = stateBuilder?.totalKkal || 0;

  const handleCheckout = () => {
    setCheckout(true);
  }

  const closeCheckout = () => {
    setCheckout(false);
  }

  return (
    <>
      <div className='burger-wrapper'>
        <div className='burger-display'>
          {/* ... bun top ... */}
          <motion.img
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className='burger-bun top'
            src={TopBurger}
            alt="top-burger"
          />

          <div className="ingredients-container">
            <AnimatePresence mode="popLayout">
              {sequence.map((ingredientName: string, index: number) => {
                const itemData = dataOfProduct.find(p => p.name === ingredientName);
                if (!itemData) return null;

                return (
                  <motion.img
                    layout
                    key={`${ingredientName}-${index}`}
                    initial={{ y: -500, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ x: 200, opacity: 0, scale: 0.8, rotate: 15 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                      mass: 0.8
                    }}
                    className={`burger-ingredient ${ingredientName}`}
                    src={itemData.img}
                    alt={ingredientName}
                    // style={{ bottom: 10 + index * 9, zIndex: index + 1, }}
                    style={{
                      bottom: (index * 15) - 30, // Brought down to lay flat on the un-margined bun
                      zIndex: 10 + index,
                      position: 'absolute'
                    }}
                  />
                );
              })}
            </AnimatePresence>

            {sequence.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='burger-message'
              >
                <p>{t('burger.addIngredients')}</p>
              </motion.div>
            )}
          </div>

          <motion.img
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className='burger-bun bottom'
            src={BottomBurger}
            alt="bottom-burger"
          />
        </div>

        <div className='price-tag'>
          <p className='total-price'>
            {t('burger.totalPrice')}:
            <motion.span
              key={totalPrice}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.2, 1], opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'inline-block', marginLeft: '5px', fontWeight: 800 }}
            >
              {totalPrice} UAH
            </motion.span>
          </p>
          <p className='total-kkal'>
            🔥
            <motion.span
              key={totalKkal}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1.1, 0.9, 1], opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'inline-block', marginLeft: '5px', fontWeight: 600, color: '#ff6b6b' }}
            >
              {totalKkal} kcal
            </motion.span>
          </p>
        </div>

        <div className='burger-actions'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCheckout}
            className='checkout-button'
          >
            <span>{t('burger.checkout')}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        <motion.button
          whileHover={{ color: '#ff4b2b' }}
          className='reset-button'
          onClick={resetBuilder}
        >
          {t('burger.reset')}
        </motion.button>
      </div>
      {checkout && <Checkout onClose={closeCheckout} />}
    </>
  )
}
