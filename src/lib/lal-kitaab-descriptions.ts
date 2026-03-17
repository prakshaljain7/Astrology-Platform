/**
 * Lal Kitaab house significations and planet-in-house descriptions.
 * Planet-in-house text is from the LAL KITAB ENGLISH doc (Year horoscope / Varshphal).
 * Only the main prediction paragraph for each planet-house is shown below the chart.
 */

import {
  LAL_KITAAB_HOUSE_DESCRIPTIONS_HI,
  PLANET_NAMES_HI,
  PLANET_IN_HOUSE_HI,
  PLANET_IN_HOUSE_REMEDIES_HI,
} from './lal-kitaab-descriptions-hi';
import {
  BIRTH_CHART_PLANET_IN_HOUSE_HI,
  BIRTH_CHART_PLANET_IN_HOUSE_REMEDIES_HI,
} from './lal-kitaab-birth-chart-hi';
import {
  BIRTH_CHART_PLANET_IN_HOUSE,
  BIRTH_CHART_PLANET_IN_HOUSE_REMEDIES,
} from './lal-kitaab-birth-chart-en';

export type DescriptionLanguage = 'en' | 'hi';

/** Chart type for Lal Kitaab descriptions: birth chart vs Varshphal (year horoscope). */
export type LalKitaabChartType = 'birth' | 'varshphal';

export interface HouseDescription {
  title: string;
  significations: string;
  bodyParts?: string;
  ruler: string;
  significator: string;
}

/** Lal Kitaab significations for houses 1–12 */
export const LAL_KITAAB_HOUSE_DESCRIPTIONS: Record<number, HouseDescription> = {
  1: {
    title: 'First House (Lagna / Ascendant)',
    significations:
      'Self, personality, body, health, education, intelligence and longevity. House of struggle between soul (Jeev) and illusion (Maya); throne of well-being. Achievements or failures depend largely on this house. Planet in 1st house aspects 7th house; if 7th is vacant the planet becomes inert.',
    bodyParts: 'Mouth, teeth, tongue, forehead',
    ruler: 'Mars',
    significator: 'Sun',
  },
  2: {
    title: 'Second House (Dhan Bhava)',
    significations:
      'Wealth, family, speech, education, honour and mind. Dharmasthana (place of worship); seat of Jupiter. Fruits of karmas manifest here. Good results when 8th house is vacant. Gets strength from 4th house; mother’s blessings help in adversity.',
    bodyParts: 'Right eye, spot of tilak',
    ruler: 'Venus',
    significator: 'Jupiter',
  },
  3: {
    title: 'Third House',
    significations:
      'Siblings, courage, short travels, hands. Gateway of exit; time and cause of death/illness are seen from here. Consider along with 8th house. Rahu/Ketu here are worrisome; with malefics in 6th or 8th, danger to life increases. Gets help from 12th house in adversity.',
    bodyParts: 'Ear, neck, hand',
    ruler: 'Mercury',
    significator: 'Mars',
  },
  4: {
    title: 'Fourth House',
    significations:
      'Mother, property, happiness, childhood, old age and wealth. Baby in womb is judged from this house. Planets here are strong by night and when help is scarce. Malefic effects of 4th house fall on the house where Saturn sits. Jupiter exalted here.',
    bodyParts: 'Abdomen, shoulder',
    ruler: 'Moon',
    significator: 'Moon',
  },
  5: {
    title: 'Fifth House',
    significations:
      'Progeny, intellect, speculation, future and health of native. Effect follows placement of Sun. Jupiter auspicious gives peace for children. Planets in 6th and 10th are enemies to 5th; can endanger progeny. House of creativity and mantra.',
    bodyParts: 'Upper part of waist',
    ruler: 'Sun',
    significator: 'Jupiter',
  },
  6: {
    title: 'Sixth House',
    significations:
      'Hidden world, treasure of mercy and providential help. Indicates mother, father, in-laws. Mercury rules; planets here afflict houses of Mercury, Ketu or Venus. Connected with 2nd and 8th by aspect. Vacant 6th avoids transfer of 8th’s ill effects. Ketu is significator.',
    bodyParts: 'Left leg, private parts',
    ruler: 'Mercury',
    significator: 'Ketu',
  },
  7: {
    title: 'Seventh House',
    significations:
      'Spouse, marriage, partnership, marital delight, means of livelihood and business. Mill of household; sky (Mercury) and earth (Venus). Only 1st house aspects 7th; if 1st is vacant 7th goes dormant. Influence follows position of Venus.',
    bodyParts: 'Navel, middle part of abdomen',
    ruler: 'Venus',
    significator: 'Venus, Mercury',
  },
  8: {
    title: 'Eighth House',
    significations:
      'Death, disease, justice (tit for tat), deeds after birth. Joint seat of Saturn and Mars. Male planets (Sun, Mars, Jupiter) here limit bad effects. Moon’s position decides 8th house effect. Ill effects pass to 12th via 2nd and 6th.',
    bodyParts: 'Left leg, private parts',
    ruler: 'Mars',
    significator: 'Saturn, Mars, Moon',
  },
  9: {
    title: 'Ninth House (Luck)',
    significations:
      'Father, fortune, dharma, higher education. Ocean of deeds; all deeds stored here and manifest as wealth in 2nd house. Dormant 9th can be awakened through 2nd when 3rd and 5th are vacant. Planet transiting 9th gives results at its own age. Seat of Jupiter.',
    bodyParts: 'Upper part of waist',
    ruler: 'Jupiter',
    significator: 'Jupiter',
  },
  10: {
    title: 'Tenth House',
    significations:
      'Career, authority, karma, status and diet. Foundation of luck; work is the base of fortune. Cannot aspect any house; 4th aspects 10th. Planet in 10th becomes doubtful; results depend on 8th and 2nd. Saturn is significator.',
    bodyParts: 'Stomach, shoulders',
    ruler: 'Saturn',
    significator: 'Saturn',
  },
  11: {
    title: 'Eleventh House',
    significations:
      'Income, gains, fulfillment of desires, status and relation with the world. Bridge between 9th (luck) and 2nd (wealth). Whichever planet is here takes nature of Saturn. Important house; even Rahu and Ketu can give good results. Place of justice.',
    bodyParts: 'Left leg, ears, neck',
    ruler: 'Saturn',
    significator: 'Jupiter',
  },
  12: {
    title: 'Twelfth House',
    significations:
      'Losses, expenses, sleep, dreams, emancipation (moksha). Place of final rest per deeds. 6th house aspects 12th. For improving 12th, strengthen 1st house (or 2nd if lagna vacant). Rahu is significator.',
    bodyParts: 'Left eye, sole of feet',
    ruler: 'Jupiter',
    significator: 'Rahu',
  },
};

/** Planet short code to full name for display */
const PLANET_NAMES: Record<string, string> = {
  Su: 'Sun',
  Mo: 'Moon',
  Ma: 'Mars',
  Me: 'Mercury',
  Ju: 'Jupiter',
  Ve: 'Venus',
  Sa: 'Saturn',
  Ra: 'Rahu',
  Ke: 'Ketu',
};

/**
 * Get planet-in-house description for Lal Kitaab.
 * Key format: "Su-1" for Sun in 1st house.
 */
function getPlanetInHouseKey(planetShort: string, houseNumber: number): string {
  const key = `${planetShort}-${houseNumber}`;
  return key;
}

/** Planet-in-house descriptions from Lal Kitab Year horoscope (Varshphal) — doc text only */
const PLANET_IN_HOUSE: Record<string, string> = {
  'Su-1':
    'According to Lal Kitab Year horoscope, this year Surya House is number 1 in your horoscope. Because of this, you will have a long life. Your hair will be short. You may have eye disease. Your nature will be of fierce tendencies. You should stay away from flirting. The number of your brothers and sisters will be less. You will serve your father. You will continue to get the happiness of women and children. If you invest 25% of your earnings in religious work, then it will be very good for you.',
  'Su-2':
    'According to Lal Kitab Year horoscope, this year Surya House is located in number 2 in your horoscope. For this reason, you are the own master of your own power, that is, you do your own work; if you are a lawyer or a surgeon then you will achieve more success. You will be helpful to others. There will be those who will attain fame. You will definitely get the pleasure of riding in your house. You should not quarrel with the woman of the house. Quarrels will have a bad effect.',
  'Su-3':
    'According to Lal Kitab Year horoscope, this year the Sun is located in the number 3 in your horoscope. That\'s why you are the king of wealth. You are going to earn your own money with your own hard work. You may also be interested in astrology. This is an auspicious task for you. You will be the eldest of brothers or you will be great in nature. You may be born in a poor family, but you will be rich. Your neighbours may be in distress due to Sun House being in number 3.',
  'Su-4':
    'According to Lal Kitab Year horoscope, this year the Sun is located in number 4 in your horoscope. Because of this, you will keep adding money but will not be able to use it, but your grandchildren will be millionaires. Due to the Sun being in number 4, you will benefit from the house in which the Moon is there. You can leave your native place and make your new residence far away. Your mother or sister may have problems. You may have eye problems.',
  'Su-5':
    'According to Lal Kitab Year horoscope, this year in your horoscope, Sun is in number 5, which is Sun\'s own house. If you build a kitchen in the east of your house, then it can be very auspicious for you. You are good at studies and high in anger. Your stomach gets upset quickly. You get help from the government quickly. You are a philanthropist and a leader who takes everyone along. You are likely to have a son; your old age will be well spent.',
  'Su-6':
    'According to Lal Kitab Year horoscope, this year Surya House is located in number 6 in your horoscope. Because of this, you will not run after wealth. You can be very angry. It has been seen that Sun number 6 has only bad effects. It is good if you change your work and job before the first child is born. If you break the west wall of your house and light it, you can be ruined. You can also be born in your maternal grandfather\'s house. You won\'t get complete rest at night. Vision can be weak in old age. Your destiny will rise after 22 years. You may be troubled by litigation.',
  'Su-7':
    'According to Lal Kitab Year horoscope, this year Surya House is number 7 in your horoscope. Your in-laws\' source of income will not be good. You are not stingy by nature and giving donation will be auspicious for you. You will be traveling and working in other countries throughout your life. But you will die in your home. If your sun is too bad, you may be born a dumb or crazy boy. You may be very angry and you may have a habit of eating more salt, which will have a bad effect on you. So reduce your salt intake.',
  'Su-8':
    'According to Lal Kitab Year horoscope, this year the Sun is number 8 in your horoscope. For this reason, you are ascetic and true-natured. No one will die in front of you in your house; you will not see the death of a person in your house with your own eyes. You may be harmed by poisonous animals. Your own death will also be sudden. You are angry and the recipient of secret knowledge. You will be attracted to women. You should not live in a house facing south. You may be the eldest in the house or if you go against your elder brother, it will have a bad effect. Your housemaids and women can be unfaithful.',
  'Su-9':
    'According to Lal Kitab Year horoscope, this year the Sun is in number 9 in your horoscope. Here the Sun is very powerful because it is the house of Jupiter. You will be the one who serves your father and grandfather. You will get the pleasure of vehicles etc. You will have the power to cure the disease of others. You will do a lot for your family but will not ask for anything back. Even if you are born in a poor family, you can still be a person who does good to the whole family on your own.',
  'Su-10':
    'According to Lal Kitab Year horoscope, this year Sun is number 10 in your horoscope. For this reason, you may also be a bit savage because House number 10 is the house of Saturn. That is why the sun will reduce its fruit here. You can be in good health and have good property. You\'ll always be confused. You should not build a skylight in the west direction of your house. Your neighbor may be black or one-eyed. You can suffer from anger. You should not wear blue clothes. You should wear light-colored clothes. You can wear a sherwani or a white turban.',
  'Su-11':
    'According to Lal Kitab Year horoscope, this year Sun is in number 11 in your horoscope, which is Saturn\'s own house, so you do not have to eat alcohol, meat and eggs. House number 11 is also called court and due to the sun being in House number 11, you will suffer a lot from fights. You should not take care of the other\'s property. You may have a lot of snake dreams. You must not bear false witness.',
  'Su-12':
    'According to Lal Kitab Year horoscope, this year the Sun is in number 12 in your horoscope, so you should not take the trouble of others on yourself unnecessarily. You must be getting a good night\'s sleep. If you do not work with your own hands and get others to work, then it will be auspicious for you. Your eyes may be weak or you may have some kind of defect in your eyes. You should live in a house that has a courtyard. You should not partner with your uncle, uncle or brother-in-law.',
  'Mo-1':
    'According to Lal Kitab Year horoscope, this year Chandra (Moon) is number 1 in your horoscope. You are the owner of longevity. As long as your mother is alive, you will have no shortage of wealth. You should avoid water. You can be a sociable person; it will be harmful for you to keep your sister-in-law in the house and use Mercury items. You should drink water in a silver vessel. You should keep taking the blessings of your mother, otherwise your mother\'s health will deteriorate. You should not build a house for 24 years. Silver should not be traded. You should put copper nails on all four legs of your bed. It will be beneficial for you to take silver from your mother\'s hand.',
  'Mo-2':
    'According to Lal Kitab Year horoscope, this year the Moon is number 2 in your horoscope. The Moon is considered to be in this house because the Moon is exalted in number 2. You must get a share in your parents\' property. You should not build a temple in the house and should not ring the bell. If you are born in Shukla Paksha then you will have a good old age and if you are born in Krishna Paksha then your childhood will be good. It will be auspicious for you to press silver in the house. If some part of your house is made of raw clay, then it will be auspicious that you can be more successful.',
  'Mo-3':
    'According to Lal Kitab Year horoscope, this year the Moon is at number 3 in your horoscope. For this reason, you respect the women in the house and this work is very auspicious for your luck. Your love for each other and the service of elders is also beneficial. Even if you are born in a poor family, you will have wealth and respect. There will be no theft in your house; your relationship with your brothers will be good and the condition of women will also be good. Cattle business can also be profitable for you. You do not have to take money from your in-laws at the time of your daughter\'s marriage. Give milk or water to the guest who comes home. Kanyadaan is auspicious for you. Donation of wheat at the time of birth of a girl is auspicious for you. Due to the conjunction of Moon and Saturn, there is poison yoga here.',
  'Mo-4':
    'According to Lal Kitab Year horoscope, this year the moon is at number 4 in your horoscope. For this reason, you should give milk instead of water to the guest who comes home. You will not be short of money. You can be a famous person. You may have farmland, milking animals and fruit-bearing trees, or gardens. You will get complete happiness from your mother, father, wife and son. If you are born in Krishna Paksha, then you have a good childhood and if you are born in Shukla Paksha, then your old age will be good. Keeping milk in an earthen pot at home will give you success.',
  'Mo-5':
    'According to Lal Kitab Year horoscope, this year the moon is in number 5 in your horoscope. House number 5 is the house of Surya and this is also the house of the sons. If you serve the people, it will have a good effect on your children. You are a person who shines like a diamond. You are a kind-hearted person. You don\'t bow down to anyone. Whoever you stand with will win. You can get benefits from government work. You will be at the forefront of judging others.',
  'Mo-6':
    'According to Lal Kitab Year horoscope, this year the Moon is in number 6 in your horoscope. Here the auspicious fruit of the moon is not found. If there is a benefic planet in House number 2, then only the moon can give good results. If you do bad deeds, the moon will give bad results. Donating water is equivalent to death for you. Drinking milk at night is harmful to you. Your wife may have trouble during childbirth. Installing a water hand pump in a hospital or crematorium can be auspicious for you. If the sun is in number 12, then your or your woman\'s eye may be damaged. You will get less happiness from your mother. Consumption of curd and paneer will be good for you.',
  'Mo-7':
    'According to Lal Kitab Year horoscope, this year the Moon is in number 7 in your horoscope. The moon is said to be the incarnation of Lakshmi in this house. You may have been born in a poor family, but you will not have problems with gold, silver and house etc. You don\'t take special care of your sister or daughter. You can be an expert in astrology, which is auspicious for you. You will die at your home. The milk business will be heavy on your children. You must take milk, silver and pearls etc. from your in-laws at the time of your marriage.',
  'Mo-8':
    'According to Lal Kitab Year horoscope, this year the moon is in number 8 in your horoscope. House Number 8 is also called Crematorium and this house is also under the influence of Saturn and Mars. If you have a pond or well near your house, then your luck will not be with you. You are a person who lives in imagination. You have a fear of water. There is a chance that your eyesight will decrease. There will be a shortage of money for 34 years. You may get less happiness of agricultural land and less happiness of women. You will also get less happiness from your wife. It will be auspicious for you to arrange water in the crematorium. Your source of income can also be black money. You will definitely get the happiness of having children. Your body may lack strength. If you have a well in your house, it can have a bad effect on your child.',
  'Mo-9':
    'According to Lal Kitab Year horoscope, this year the moon is in number 9 in your horoscope. In House Number 9, the Moon is also considered to be the factor of land and property. Due to this, you will not have much shortage of land. You will be an expert in mathematics science. You are a person who makes a pilgrimage. You are a person who does good to everyone. You can get the happiness of your parents for a long life. If you have an elder brother, you will not get his support. You will not lack financial income. You may also be fond of music.',
  'Mo-10':
    'According to Lal Kitab Year horoscope, this year the moon is in number 10 in your horoscope. House number 10 is the house of Saturn. You may have a long life. You can have a good amount of money. You can do the work of medicines. You should not give liquid medicine to a sick person. If your mother\'s health is bad, then you should go to the temple every day. You can get the full happiness of your parents. You may be harmed by a widowed woman. Your in-laws\' financial condition may be good. You will not benefit from the animals that give milk. Machines and woodworking can be auspicious for you. If you have a relationship with another woman, it will be harmful for you.',
  'Mo-11':
    'According to Lal Kitab Year horoscope, this year the Moon is in number 11 in your horoscope. House number 11 is the pucca house of Saturn. The moon gives its bad effect here; there is a combination of poison defects in this house. If the moon comes in one or two years in the year, it gives good results. It is auspicious for you to take or give Kanyadaan after 12:00 o\'clock in the night. You have less power to have a son. You will get less support from your mother or her health will be poor. You should not work on children\'s toys. You should not worship at night. If your moon is good then you can become a high officer. If you do good work, you will get good results. If you do bad things, you will get bad results.',
  'Mo-12':
    'According to Lal Kitab Year horoscope, this year the Moon is in number 12 in your horoscope. House number 12 is Jupiter\'s own house. But there is also the effect of Rahu here. That is why the moon does not give auspicious results; if you get wealth from your parents, then it should not be taken in your name but in the name of your wife and son. You will get a lot of benefit from the money earned by your own hands. Trouble will come to you again and again. You won\'t sleep well at night. You may also have scalp disease. You may be lazy. After the age of 48 years, the fruit of the moon will be auspicious. You or your wife may have an eye disorder.',
  'Ma-1':
    'According to Lal Kitab Year horoscope, this year Mars house is number 1 in your horoscope. Due to Mars being in House number 1, you will have brothers. You can have 32 teeth. You will progress after the age of 28. The work of iron, wood, machine, etc. is auspicious. You will be the one to help your brothers and in-laws. If you say anything about someone, it is likely to be fulfilled. If your Mars is inauspicious, then Mars will start giving bad effects within 40 days of your birth. You should work closely with your uncle, uncle or nephew. If you have a sister, she will be like a queen. You should not take the trouble of others on your head.',
  'Ma-2':
    'According to Lal Kitab Year horoscope, this year Mars house is in number 2 in your horoscope; either you will be the eldest or behave like an elder brother. You will be fortunate to be with your brothers. You will fulfill the needs of others. Of course, you do not have a store of money; both your in-laws and home will be prosperous. Money will be arranged if you need it. Electrical work will be beneficial for you. You must be a believer of religion. You are likely to have stomach disease in childhood.',
  'Ma-3':
    'According to Lal Kitab Year horoscope, this year Mars house is number 3 in your horoscope. You are a man of brave nature. You can do any great work on the basis of your strength and self-confidence. No one can fool you. You get angry very quickly. Your mind is fickle. If your Mars is not auspicious, then your nature will be like a zoo lion. Your in-laws may be wealthier than you. Your brothers and sisters must also be there. You help your friends and visitors from time to time. If you have a small head and a bloated stomach, you may have a blood-related disease.',
  'Ma-4':
    'According to Lal Kitab Year horoscope, this year Mars house is in number 4 in your horoscope. For this reason, no one can bother you for any reason; if they do, then you are able to respond to him well. If you have a sense of revenge, you will be at a loss. You may be heavy on your mother, mother-in-law, wife or grandmother. The kikar or berry tree in your house is inauspicious for you. If there is a confectionery shop or a roasting kiln around your house, then you will be at a loss. The house of the south gate is also harmful for you.',
  'Ma-5':
    'According to Lal Kitab Year horoscope, this year Mars house is number 5 in your horoscope. This is the perfect home of the sun. Sun and Mars are close friends. That is why Mars gives excellent results here. As your age increases, your wealth will also increase. If you live in your family home, then you will continue to get the happiness of children. There may be more doctors in your relationship. You will have no shortage of money. Your progress will start from the time of the birth of your child. Due to your auspicious mansion, the money earned by you will also give happiness to your children. You will benefit from keeping water near your head at night. Water a plant in the morning. You are the owner of a calm nature.',
  'Ma-6':
    'According to Lal Kitab Year horoscope, this year Mars house is in number 6 in your horoscope. House number 6 is influenced by Mercury and Ketu and both are enemies of Mars. For this reason, Mars gives its bad effect. It will be harmful for you to celebrate when you have children. Your first son is unlikely to survive. You will get the happiness of children at the age of 34. You can earn money on the strength of your speech. If you do any pen work to read and write, then it is auspicious for you. Your brothers may be less wealthy than you. If you help them financially, it will be auspicious for you. The health of your maternal uncle, your wife and your children may deteriorate. You can see your three generations with your own eyes.',
  'Ma-7':
    'According to Lal Kitab Year horoscope, this year Mars house is in number 7 in your horoscope. If there is Mars in House number 7, then Lord Vishnu should be worshiped. Serving your nephew is auspicious for you. You are a person who performs religious deeds and is useful in trouble. The business of astrology is auspicious for you. You are a man of justice. If Mars is bad, your domestic life can also be spoiled. If you have a well near your house, then it is inauspicious for you. If your widowed sister stays with you, you will lack children. You may also have blood-related disorders. You will continue to get both profit and loss in life. A broadleaf tree is inauspicious for you. Consumption of meat and liquor is auspicious for you. Do not break the stairs in the house and make it again and again.',
  'Ma-8':
    'According to Lal Kitab Year horoscope, this year Mars house is number 8 in your horoscope. Mars is not auspicious in House number 8. Here Mars is also called the noose of death. You will not get female happiness. You should set up a dark closet in your house that does not have light. You should avoid the curse of a widowed woman. Your eyesight may also be weak. You should keep in mind that your uncles, brothers and nephews are not suffering again and again. You will also get less happiness from your mother. You should avoid anger. You should wear a silver chain until the age of 28. The house in the south direction is not auspicious for you.',
  'Ma-9':
    'According to Lal Kitab Year horoscope, this year Mars house is in number 9 in your horoscope. House number 9 is the house of Jupiter, which is the friend of Mars. That is why Mars has a good effect in this house. If you are a believer, you will get good results, and if you are an atheist, you will get bad results. Your sister-in-law is lucky for your luck. If you live with your brothers and work with them, it will be auspicious for you. Businesses such as hotels, sweets or food and drink in which fire is used are beneficial for you. You are likely to get land property from your father. From the age of 13, the financial condition of your parents will improve and by the age of 28 you will have your own wealth.',
  'Ma-10':
    'According to Lal Kitab Year horoscope, this year Mars house is in number 10 in your horoscope. Mars is exalted in House number 10. You can be a benefactor of your family. There must have been economic development in the family after your birth. You are a person who builds land and property on your own. If you have an elder brother, you will definitely have a son. You are the owner of good health. You are of a brave nature. Your family and hard work will increase day by day. You are the owner of a good household. You will continue to get the happiness of wife and children. If you sell gold, it is inauspicious for you because it will have a bad effect on you. You will benefit from black people if you help them.',
  'Ma-11':
    'According to Lal Kitab Year horoscope, this year Mars house is in number 11 in your horoscope. House number 11 is the house of Saturn. But it is also influenced by the planet Jupiter. That is why Mars gives auspicious results here. In this house, Mars is called a lion grown by drinking milk. Your spiritual power will be very high. It is beneficial for you to raise and serve animals. You always judge. If Mars becomes inauspicious in this house, then the person loses money. The native himself suffers and the son of the native also suffers. The influence of Mars remains till the age of 45 years. You continue to get help from your sister\'s in-laws, your own in-laws and your mother\'s in-laws. If you do a job, you get a high position and if you do business, you get good profits. The 28th year is auspicious for you. Your brother-in-law and your son-in-law are all auspicious for you.',
  'Ma-12':
    'According to Lal Kitab Year horoscope, this year Mars house is in number 12 in your horoscope. Mars gives its good influence in House number 12 because this house is the house of the planet Jupiter and Mars and Jupiter are friends with each other. You may be a hot-tempered person and you are late in listening to others. If you serve your Guru, it will be auspicious for you. In the age of 24 or 28, you are likely to have a son, which will be very auspicious for you. You can be the owner of good money. If Mars is auspicious, the biggest trouble coming on you will be avoided. If your brother comes to your house, then definitely give him milk. It will be auspicious for you to donate silver or rice from your brother. It will be auspicious for you to feed sweets to people.',
  'Me-1':
    'According to Lal Kitab Year horoscope, this year Mercury is number 1 in your horoscope. House number 1 is influenced by the Sun and Mars and Mercury lives as a tenant in it. You may have to face infamy due to Mercury being in House number 1. You should not consume meat and alcohol. If you work in one place rather than roaming around, you will get more benefit. Your wife may be from a rich family. If you earn money through medicine and doctor\'s work, then it will not give you auspicious results. Consumption of alcohol, meat and fish will have a bad effect for you.',
  'Me-2':
    'According to Lal Kitab Year horoscope, this year Mercury is in number 2 in your horoscope. In House number 2, the planet Mercury is like a tenant. If you work with a pen i.e. write and read, then it will be auspicious for you. If you do the work of wealth, i.e. interest, then it will be auspicious for you. You may get less fatherly happiness or less than your own father. You may be a quick answer, but your sister, aunt and daughter will not benefit. You may be a greedy and money-hungry person. Your intellect will be sharp. You can become richer by working less. You will rarely get the pleasure of property from your father.',
  'Me-3':
    'According to Lal Kitab Year horoscope, this year Mercury is in number 3 in your horoscope. Mercury and Mars have the authority over House number 3. The effect of Mercury in this house is bad. Because of you, your ancestors will be badly affected. If your house is facing south, then you will be at a loss. If your Mars is not good, then you will continue to stumble throughout your life. Your work and feet can be badly affected. Mercury in the third house is also called the spitting Kodi repeatedly. You will not be able to give benefits to the people, but they will only suffer. You are not very beneficial to your siblings.',
  'Me-4':
    'According to Lal Kitab Year horoscope, this year Mercury is number 4 in your horoscope. House Number 4 is the Moon\'s own house. In this house, Mercury gives good results for its objects. Your income will be good and your income will continue to increase day by day. If your mother\'s health is bad, it means Mercury is giving inauspicious results. It will be auspicious for you to take the remedy of the planet Jupiter here. If the planet Mercury is malefic, then all the members of the house can be affected and also on the domestic life. If you take the advice of a person, then it can also be the reason for your ruin.',
  'Me-5':
    'According to Lal Kitab Year horoscope, this year Mercury is in number 5 in your horoscope. House Number 5 is the Sun\'s own house. The effect of Mercury is good here. Here, any word that comes out of the mouth of the native is a bad or good word about someone. If you serve the cow, it will be auspicious for you, for yourself, for your wife and for your children. After 34 years, your fortune will rise. You will get good results in both business and family. If you fool someone, you will do your own bad. You are a person of character whose fruits will be fully reaped by you. You will not be short of money.',
  'Me-6':
    'According to Lal Kitab Year horoscope, this year Mercury is in number 6 in your horoscope. House number 6 is the sign of Mercury and the planet Mercury is exalted here. If you want to earn money from agricultural land, then it will be auspicious for you. Paper work or printing on paper is auspicious for you. North direction is not auspicious for you. You will benefit from doing business with countries across the sea. By the age of 34, your mother\'s health will be badly affected. Your wife may belong to a well-to-do family. If your house is north-facing, you will suffer. You should also not marry your daughter in the north direction. Before doing any special work, if you give flowers to your daughter or a girl, then it is auspicious for you.',
  'Me-7':
    'According to Lal Kitab Year horoscope, this year Mercury is in number 7 in your horoscope. Mercury planet of House number 7 gives higher education to a person. If you turn your pen into a sword, you will get the benefit. You will do any work with your own hands, such as carpenter\'s work, etc. will be auspicious for you. You will help all your family members from time to time. You will win in litigation. You are more likely to have a love marriage. Your childhood will be spent badly. If your Mercury is going down, then the female side i.e. your sister, aunt, girl and sister-in-law will be badly affected.',
  'Me-8':
    'According to Lal Kitab Year horoscope, this year Mercury is in the 8th house in your horoscope. House number 8 is also known as the well of death. Generally, no planet gives good results here, so Mercury also does not give good results here. Because of this, you lose money. You may have a long illness. You may have problems with your teeth and nerves. You keep facing small and big obstacles in business and job. In this house, Mercury is also called the flower offered to the dead. It is good for you to have rainwater on the roof. If you give kheer or milk to dogs, it will be auspicious for you. You will rarely get the happiness of a mother.',
  'Me-9':
    'According to Lal Kitab Year horoscope, this year Mercury is in number 9 in your horoscope. This house is the home of the planet Jupiter. But the effect of Mercury is not good here. Here the mind of the native does not get peace and allegations are made without any reason. In this house, Mercury is also called the king of cowries. A person with Mercury House number 9 also gives a lack of respect to his father. If you keep ashes, amulets or any other device with you, it will have a bad effect. Getting a nose piercing will be auspicious for you. Wearing silver is auspicious for you. If you keep an amulet in the house, then the bad effect will be visible on you within 43 days. If you have trouble speaking, you may also have trouble having children.',
  'Me-10':
    'According to Lal Kitab Year horoscope, this year Mercury is in number 10 in your horoscope. If Mercury is in House number 10, then such a person completes the flattery of the person in front of him to get his work done. For this, he can go to any extent. Such a person is a sweet-talker and gets his work done by trapping others, that is, he deceives people. You can also earn money from sea travel. You can be proficient in any task. If you are shameless in nature, it is inauspicious for you. If you eat delicious food, it is harmful to you. Your age from 36 to 58 years will be slow. If you consume alcohol, it will be like snake venom for you.',
  'Me-11':
    'According to Lal Kitab Year horoscope, this year Mercury is in number 11 in your horoscope. Your destiny will rise only after 34 years. You can be proficient in any task. If you do not respect others, it will be bad for you. You can make so much money when the time comes that buying diamonds and pearls will be like buying peanuts. Don\'t do stupid things. Take someone\'s advice, otherwise you will lose money, lose fame and mind will be restless. If the fruit of Mercury is getting you slow, then whatever work you are doing will be at a loss and everyone will keep calling you an owl stalker. Your sister will go to a wealthier family than you, but she is likely to be widowed or divorced from her husband.',
  'Me-12':
    'According to Lal Kitab Year horoscope, this year Mercury is in number 12 in your horoscope. Mercury is debilitated here. Such a person is the master of sorrows, seeing which even the sky weeps. Mercury gives inauspicious results in the 12th. If you stay in the house of your sister, aunt, etc., then your sorrow will increase further. If you live in your in-laws\' house, it will be auspicious for you. You keep losing money. Such a person is a liar and reneges on the promises he makes. If you do speculation, alcohol, paper or printing on paper, then you will get bad results and you will also get a lot of defamation. You may also have nerve disease. You can be a person who works in a hurry and without thinking in every work.',
  'Ju-1':
    'According to Lal Kitab Year horoscope, this year Jupiter is number 1 in your horoscope. In House number 1, Jupiter is also called Rajguru or a monk who has all the comforts. You can be a person with good education. You can take your business far beyond your mind. You are a person who gets good help from the government. If you build a house or get married before the age of 28, then it will be harmful to your father. You can get the benefit of real estate. Your father may have a heart or mental illness. You will benefit from serving your wife or cow. If your Jupiter is good, then you will definitely have some skill.',
  'Ju-2':
    'According to Lal Kitab Year horoscope, this year Jupiter is number 2 in your horoscope. House Number 2 is Venus\'s own house. Venus and Jupiter are at enmity with each other. Due to this, Jupiter is not able to give good results here. If you trade gold, you will only get a loss. After your birth, both your father\'s wealth and age will increase. By the way, you will get property from your father, but you can also collect good money on your own. Your wife may be more beautiful than you and you will get success after marriage. You can get benefits from agricultural work. Your daughter, aunt and sister may be badly affected.',
  'Ju-3':
    'According to Lal Kitab Year horoscope, this year Jupiter is in number 3 in your horoscope. It will be auspicious for you to maintain good relations with your brothers and sisters. Your progress will start from the age of 26. You can be a wealthy person. If you flatter yourself, it is harmful to you. That is why you should avoid flattery. If you exaggerate your things or talk nonsense, then your child will be badly affected. After the birth of your child, your fortune can rise. You will benefit from wearing Jupiter\'s object gold. Your house may be in a good location. It is inauspicious for you to stay in your sister-in-law\'s house. Feeding girls will be auspicious for you.',
  'Ju-4':
    'According to Lal Kitab Year horoscope, this year Jupiter is number 4 in your horoscope. House Number 4 is the house of the Moon. Both the Moon and Jupiter are friends with each other. That is why the auspicious fruit of Jupiter is found here. You can be the owner of a good real estate property. You will never have any shortage of money. You will continue to get the happiness of women, children and parents. Everyone will obey your father\'s orders and he is a man of justice. Jupiter and Mercury in House number 4 can harm you due to House number 10. At the age of 23, 34, 48 and 55 years, your mother may suffer. You may also be charged. You can benefit from the lottery. You can also get your suppressed money.',
  'Ju-5':
    'According to Lal Kitab Year horoscope, this year Jupiter is in number 5 in your horoscope. House number 5 is Surya\'s own house and the offspring are also seen from this house. You have the full sum of sons and children. You may be a very angry person. If you earn 1 time more money in life, then your son will earn 4 times more money in his life. After your children, your fortune will rise. If you donate money, it is not auspicious for you or if you collect money in the name of religion, it is also not auspicious for you. If you do this, your child will suffer. If the sun is number 5, you will get a lot of respect and you will reach very high.',
  'Ju-6':
    'According to Lal Kitab Year horoscope, this year Jupiter is in number 6 in your horoscope. House number 6 is the house of Mercury and Ketu. For this reason, you will continue to get food for subsistence without doing any work. In House number 6, Jupiter is called the free saint for this reason. If Saturn is in a good place in your horoscope, then the position of your hand can be good. Your situation will be such that you are able to get peace of mind from your earnings, but you will not get luxury comforts like Venus\'s things. Your maternal side will be very good in financial condition but they will not support you financially. In the bad position of Mercury and Ketu, your financial condition will be weak.',
  'Ju-7':
    'According to Lal Kitab Year horoscope, this year Jupiter is in the number 7 in your horoscope. House number 7 is the house of Venus. Venus and Jupiter are enemies of each other. Both have a figure of 36. For this reason, your situation may be like that of a monk trapped in the household. Your financial condition is also bad. If you build a temple or worship on the roof, then it is inauspicious for you. You will try to run away from your responsibilities. Your destiny is likely to rise only after 34 years. You are a relaxed person and are not able to make good use of your time. You can also be proficient in astrology and you can also get benefits from it. If you have a child after the age of 45, you can ruin yourself.',
  'Ju-8':
    'According to Lal Kitab Year horoscope, this year Jupiter is in number 8 in your horoscope. House number 8 is influenced by Mars. The 8th house is also called the place of death. If the native is in trouble, Jupiter helps them. You may not have lived with your father or your father may have moved away from you when you were 8 years old. If your Jupiter is good, then you can get very good benefits by doing any work. You will get the happiness of a child. If Saturn or Mars is in the 4th or 7th house, then you can also lose your ancestral property or you will always remain in debt. You may also have a number of blood-related diseases. If Rahu is not correct in the horoscope, then due to this your position in money can be spoiled. You may be suspicious.',
  'Ju-9':
    'According to Lal Kitab Year horoscope, this year Jupiter is in number 9 in your horoscope. House Number 9 is Jupiter\'s own house. When Jupiter is in this house, the person is born in a good family. That is, the fathers and grandfathers will have good money. House Number 9 is the home of spirituality. For this reason, you can be a great yogi. You can renounce your family or even give up your property. You get a profit at the age of 16, at the age of 19, at the age of 32, at the age of 39. You will have the same thing as kings. You may get less happiness of children. You should follow religion. Don\'t make false promises to anyone. If you do this, it will be harmful to you.',
  'Ju-10':
    'According to Lal Kitab Year horoscope, this year Jupiter is in number 10 in your horoscope. House number 10 is the house of Saturn. Here the good fruit of Jupiter is rarely found. Here the native himself is unhappy and his family is also unhappy. When Jupiter is in House number 10, the person is not able to give all the happiness to his child. You have to work hard to earn money; that is, if you are intelligent, religious, and do good to others, then you will be badly affected. If you have a relationship with a stranger, then you can suffer a lot. If your women die again and again, no one supports you for a long time, but leaves the responsibility of a child to you, then you should apply saffron tilak every day.',
  'Ju-11':
    'According to Lal Kitab Year horoscope, this year Jupiter is in number 11 in your horoscope. It is the house of justice and the house of Saturn. If such a person indulges in bad deeds, then at the time of his death, he does not get a shroud or a respectable funeral by the child. Such a person does not have any problem till his father is alive, but after the father is gone, he will be alone from all sides. After the death of the father, the person may benefit from his wealth. You must keep your promises. If you help the poor and believe in religion, go to the temple daily or worship the Patha Puja, then you will benefit. If the position of the Sun is correct then you will get benefits from the government.',
  'Ju-12':
    'According to Lal Kitab Year horoscope, this year Jupiter is in number 12 in your horoscope. House number 12 is Jupiter\'s own house. The more good you do to others, the better the result you will get. If you worship at home or sit and worship, then you will not be short of money. You can own a good house and a good car. You can be the owner of a good household. Wealth will follow you yourself. You don\'t have to work hard for it. You will be afraid of losing your respect. You are a person with a long life. From time to time, you will be afraid of your child. If you do not respect the Guru or cut down the Peepal tree, then it is inauspicious for you. Applying saffron tilak will be auspicious for you.',
  'Ve-1':
    'According to Lal Kitab Year horoscope, this year Venus is number 1 in your horoscope. Due to Venus being in House number 1, you are a working person and you also get benefits from the government. You will get the pleasure of riding to the fullest. Your income will be good, but in terms of savings, you will not be able to save much. House number 1 is influenced by the Sun and Mars and Venus is the enemy of both. Therefore, you or your wife may complain of a long illness. You are quick to be attracted to women and give everything for her. If you have sex during the day, it is harmful for you. It is not auspicious for you to get married at the age of 25. Your chances of losing a case are low. You may have relationships with many women who have a bad effect on you.',
  'Ve-2':
    'According to Lal Kitab Year horoscope, this year Venus is number 2 in your horoscope. House Number 2 is Venus\'s own house. You will continue to earn continuously for 60 years from the day you start earning. You may be of a lover\'s nature. Doing evil to someone is harmful to you. You will continue to enjoy your children and luxuries to the fullest. Due to you, the condition of your sons and brothers can be good. If Saturn is in House number 9, then the fruit of Venus will be doubled. If your house is Gomukhi then it will be harmful for you. It has often been found that your wife will not be happy with you due to Venus in House number 2. Sleeping is harmful to you.',
  'Ve-3':
    'According to Lal Kitab Year horoscope, this year Venus is number 3 in your horoscope. House number 3 is under the influence of Mars and Mercury. If you follow your wife\'s advice, it will be beneficial for you. You can earn more money by working less. If you go on a pilgrimage till the age of 34 then it will be auspicious for you. If you do not sleep by the age of 34, then you should take the Mercury remedy. You are likely to get the happiness of your parents for a long time.',
  'Ve-4':
    'According to Lal Kitab Year horoscope, this year Venus is number 4 in your horoscope. With Venus in number 4, you will travel a lot, which will benefit you. Your maternal uncle\'s family may be badly affected. You will have a spiritual inclination. You may have some power. If you have a dispute with your wife, then you should remarry your wife and call her by two names at home. You should never close a well and build a house on top of it. Your 4 years after marriage will be very good. If you flatter someone else, it will be bad for you. Do not have a relationship with anyone other than the wife; this act can also cause catastrophe. If Jupiter is in house number 1, then your maternal uncle, your mother and your wife will be badly affected.',
  'Ve-5':
    'According to Lal Kitab Year horoscope, this year Venus is number 5 in your horoscope. House Number 5 is the pucca house of the sun. Due to Venus being in House number 5, your wife\'s health can deteriorate. You are a learned man and the enemy cannot stand in front of you. You should not have a relationship with anyone other than your wife, otherwise your luck will be spoiled. As long as your wife is with you, you will not face any obstacle in any work. If you behave like a monk with everyone, then your fortune will shine like a diamond. If you keep your behavior right, then you and your wife\'s health will be fine. Serving the cow and mother will be auspicious for you.',
  'Ve-6':
    'According to Lal Kitab Year horoscope, this year Venus is in number 6 in your horoscope. House number 6 is affected by Mercury and Ketu. If you are living as a wife, then there is no dearth of wealth in your house. Your wife should keep her hair long and wearing a gold clip will make her even more comfortable. Your marriage may be delayed. Your studies may be interrupted. You will also get less happiness from your father. You are the owner of a healthy body. Your old age will also be spent well. Your wife should not walk barefoot at home. It may be that your child does not listen to you. If your wife does not have an elder brother, then it is good for you. If you do work related to the use of women, then you may not get success. You can be a good person to impart knowledge.',
  'Ve-7':
    'According to Lal Kitab Year horoscope, this year Venus is in number 7 in your horoscope. House number 7 is Venus\'s own house and House number 7 is also the house of marriage. If Venus is in the number 7, then you should not do business in partnership with any person from the in-laws. Your wife should not wear blue clothes. You keep going away from your home for business again and again. Due to this, you will get less happiness in the family. If you are in a relationship with a stranger, it can cause destruction. Your wife may be more beautiful and sweeter than you. After marriage, your luck will start shining. You are more likely to lose business or have your home stolen. If light comes from your roof, it can have a bad effect on your wife\'s health.',
  'Ve-8':
    'According to Lal Kitab Year horoscope, this year Venus is number 8 in your horoscope. House number 8 is also called a crematorium, so there is no good fruit of the planets here. The native\'s wife is seen from Venus; that is why due to Venus in House number 8, the wife of the native is angry and useless in nature. The home life of the native is bad and he himself is also troubled. If the person disturbs his wife, then the person himself is upset. The person should get married only after 25 years. The person is also an expert in secret knowledge, but the person remains indebted. The native may also be inauspicious for his in-laws. Taking someone\'s bail on the native can create trouble for him.',
  'Ve-9':
    'According to Lal Kitab Year horoscope, this year Venus is in number 9 in your horoscope. House number 9 is the home of Jupiter and Venus and Jupiter are enemies of each other. Due to this, Venus becomes bad. Such a person has to yearn for bread even after having money. If the person gets married at the age of 25 or if he does any work which is related to Venus, then the native will suffer. The native rarely gets the happiness of brother, brother and wife. If the native stays with his wife\'s maternal family, it will be inauspicious for him. At the age of 17, the native may also have a habit of intoxication and the health of the native\'s wife is also bad due to diseases.',
  'Ve-10':
    'According to Lal Kitab Year horoscope, this year Venus is in number 10 in your horoscope. House number 10 is the house of Saturn and Saturn and Venus do not have enmity with each other. Because of this, the person gets the benefit. If you do work related to Saturn, then you will benefit. Wherever you go for work and take your wife along, then the profit can be doubled. You may be a person of doubt. You can be the master of the devil mind and be smart. Your wife\'s health can be good. You should keep the west wall raw or keep the west side unpaved will give you an advantage. If you become immoral, your child will suffer. If your health is not good, then you should donate Kapila cow, it will be auspicious for you.',
  'Ve-11':
    'According to Lal Kitab Year horoscope, this year Venus is in number 11 in your horoscope. You are a naïve person. You run after money more. You may be a person who does covert work. You keep changing your rules over time. If your wife controls your money, then your business can be ruined. You may also be late in getting a son. If your wife has three brothers, then it will be auspicious for you to take their help. Your daughter will be born with her own destiny and there will be no shortage of money for her. If your child\'s health is poor, then you should donate mustard oil.',
  'Ve-12':
    'According to Lal Kitab Year horoscope, this year Venus is in number 12 in your horoscope. Venus is also said to be the abode of Lakshmi in this house. The person continues to get female happiness till 37 years of marriage. You are a person who gives good opinions and your advice is useful to people. Your old age will be spent well. You exaggerate even your minor ailments. If you take care of your wife, it will be very auspicious for you. If you are religious, then it is auspicious for you. Your wife may be overly talkative and suspicious. It is inauspicious for you to keep your brother-in-law together. Serving a white cow is auspicious for you.',
  'Sa-1':
    'According to Lal Kitab Year horoscope, this year Saturn is number 1 in your horoscope. House number 1 is the house of Mars; this house is influenced by the Sun and Mars. The Sun is the enemy of Saturn. For this reason, the effect of Saturn is not good. There has been a hindrance in the education of the native. If there is an enemy planet of Saturn in House number 4, 7, 10, then Saturn auctions all the items of the house. When Saturn is in House number 1, a person starts stealing etc. and deceives others. Due to Saturn being in House number 1, a person\'s education, his wife and his mother as well as wealth are also badly affected. There are also obstacles in the government work of such a person. Such a person\'s eyesight is also weak quickly. That is to say, the effect of Saturn in House number 1 will remain sluggish.',
  'Sa-2':
    'According to Lal Kitab Year horoscope, this year Saturn is in number 2 in your horoscope. House number 2 is influenced by Venus. Venus is a friend of Saturn, so the effect of Saturn is fine here. In the event of Mars being bad, the person remains ill for 31 years. Such a person also gives bad impressions for his in-laws. If the native gambles, then there is a bad effect for him. Such a person thinks of renunciation by leaving worldly life. If such people buy houses, machines, cars, etc., then their in-laws have a bad effect.',
  'Sa-3':
    'According to Lal Kitab Year horoscope, this year Saturn is number 3 in your horoscope. House number 3 is the house of Mercury, which is a friend of Saturn. When the houses of such a person are built, you get the best results. Such people are healthy. They have a good intellect in conversation and do all the work thoughtfully. But they are at the forefront of spending. Keeping such a person\'s dog also gives auspicious results. But the house in the south direction gives inauspicious results. If there is any stone or electric pole in front of the house, then there is damage. The native should make a room in his house in which there is no light, then it will be auspicious for his wealth.',
  'Sa-4':
    'According to Lal Kitab Year horoscope, this year Saturn is in number 4 in your horoscope. House number 4 is the Moon\'s own house and Saturn makes poison yoga here. If the person falls ill again and again, he should take pills. Liquid medicine should not be taken. Such a person should not use alcohol, meat and eggs. Drinking milk at night is equivalent to drinking poison. Such a person does not suffer from drinking alcohol. If the moon is auspicious, then the person will get the support of his parents for a long time and the happiness of the household will also be available for a long time. Such a person is not auspicious for his maternal grandfather and maternal uncle. If such a person earns badly from women, then it is inauspicious for him. Serving the labourers gives auspicious results for such a person.',
  'Sa-5':
    'According to Lal Kitab Year horoscope, this year Saturn is in number 5 in your horoscope. House Number 5 is the Sun\'s own house. Sun and Saturn are enemies of each other. For this reason, only the bad effect of Saturn is seen. You try to get others to agree with you at all costs. You have a lot of arrogance. If you do not use your mind, then you will suffer in every task. If you build a house, it can have a bad effect on your child; so if you build a house, then build it in the name of your child or you should build the house only after the age of 48 years. You should not make your son\'s birthday and distribute snacks instead of sweets. Keeping a dog will be auspicious for you.',
  'Sa-6':
    'According to Lal Kitab Year horoscope, this year Saturn is in number 6 in your horoscope. House number 6 is the house of Mercury and is under the influence of Ketu. Saturn is a friend of both of them, so Saturn rarely gives bad results here. You should get married only after the age of 28. You must have children. Your behavior may not be good with the eldest son. But it will be useful in your last moments. It may be that your younger brother is hostile to you. If your sons are born, it will have a good effect on the health of the parents and their financial condition. It may also be that you get complete pleasure from a woman. If you lose your shoes, you will have to face problems in police, court, or government work. You should reduce the use of leather items such as purses, belts, and shoes.',
  'Sa-7':
    'According to Lal Kitab Year horoscope, this year Saturn is in number 7 in your horoscope. House number 7 is Venus\'s own house. Saturn is exalted here, so Saturn gives good results here. If you keep it with your wife, it will be beneficial for you and your money. You should not work in partnership with any person. You are likely to inherit land and property. If Mars is auspicious, then your income can be millions of rupees a month. If you do not have much hair on your body, then the effect of Saturn can be reversed here. If you keep in touch with a foreign woman, it will be inauspicious for your woman. If you consume alcohol, you will lose money. Working at night is auspicious for you.',
  'Sa-8':
    'According to Lal Kitab Year horoscope, this year Saturn is in number 8 in your horoscope. House number 8 is the house of Mars and Saturn acts as the executioner here. You should not consume eggs, meat and alcohol. If you consume it, then Saturn will have a bad effect. You will continue to fear being punished by the government. If you have more hair on your body, then you may have to face poverty throughout your life. If there is any other planet with Saturn in House number 8, then you will get success only after the death of as many planets as there are or whatever planet is with Saturn, Saturn will continue to harm it. You will also be afraid of getting damaged in your eyes. You are likely to be injured by a weapon by the age of 27.',
  'Sa-9':
    'According to Lal Kitab Year horoscope, this year Saturn is in number 9 in your horoscope. House Number 9 is the home of the planet Jupiter. Only the best fruit of Saturn is seen here. You can be a philanthropic person. Your house may be the corner, or there will be free space in the front and back of your house. You can build three houses, but as soon as you build the fourth house, you will start having problems. You should not keep broken wood at your home. You may be born into a large family. Your education can be good. Your income can be good and you will never take a loan from anyone. You will suffer from Saturn\'s items such as factory work, shoe work and woodwork.',
  'Sa-10':
    'According to Lal Kitab Year horoscope, this year Saturn is in number 10 in your horoscope. House number 10 is Saturn\'s own house and Saturn gives good results here. You will continue to benefit from land and property. You are a person who does religious work, but you are going to put the trouble of others on your neck. If you do any work for which you have to go from one city to another, then this work will be auspicious for you. Drinking alcohol is harmful to you. You should not build a new house before the age of 48 years, otherwise your income will stop and you will have to suffer a lot of losses. Your destiny will rise after 27 years. Your in-laws\' financial condition may be good.',
  'Sa-11':
    'According to Lal Kitab Year horoscope, this year Saturn is in number 11 in your horoscope. House number 11 is Saturn\'s own pucca house and this house also shows the income of the person. When Saturn is positioned in this house, it is like a judge who gives the verdict. You are likely to get wealth from your father. You also have the possibility of having children. You can earn money by taking your smarts and others into your words. If you live in a south-facing house, it is not auspicious for you. Eggs, meat and alcohol will give you a bad effect. If you want to build a house, then you should build it between the age of 48 and 55 years, otherwise you will suffer losses.',
  'Sa-12':
    'According to Lal Kitab Year horoscope, this year Saturn is in number 12 in your horoscope. If hair is falling from your head, then you will not lack wealth. There are full chances of building your house. You can be a good trader. But you also cheat on the other person. You don\'t care about money. You can be troublesome for your mother and your father\'s expenses will increase significantly after your birth. If the Sun is in the number 6, then you will not get wife happiness. You must make a dark room inside the house. If you consume alcohol etc., it will have a bad effect on your eyes and health. Don\'t tell anyone your secrets. You are always eager to do big things.',
  'Ra-1':
    'According to Lal Kitab Year horoscope, this year Rahu House is number one in your horoscope. House number 1 is influenced by Mars and Sun; the effect of Rahu has been seen here less. You should not take electrical appliances and black clothes from your in-laws at the time of your marriage or even after that. You should keep donating wheat etc. At the time of your birth, there may have been a rain or storm or there may have been a power outage for some time. There is a possibility that there may not be a male child in the house in front of you. You may be a person who is dishonest with the other person. You should not do electrical goods etc. If you change jobs frequently, your wife will make less money.',
  'Ra-2':
    'According to Lal Kitab Year horoscope, this year Rahu House is number 2 in your horoscope. House number two comes under the control of Jupiter and Venus, so either your condition will be good or very bad. If you get female happiness, then there will be a decrease in wealth and if you get wealth, then there will be a decrease in female happiness. The fear of money being stolen will always haunt you. Other people will listen to you and respect you. You will continue to get good and bad results in life. You are a person who eats for free from others. However, they will not give anything to others. If your nails are getting worse, then it is an ominous sign. You may have paralysis and mental illness.',
  'Ra-3':
    'According to Lal Kitab Year horoscope, this year Rahu House is number 3 in your horoscope. House number 3 is under the influence of Mars and Mercury; due to which you are a powerful person, your enemies are not able to stand in front of you. Rahu is good for himself here. The dreams you get come true within 2 years. If you face your enemy with a pen instead of a sword, it will be more effective. You can leave your father\'s property. If Mars is also in house 3, then the auspicious effect of Rahu will increase further. Your children will also be wealthy. Your wife will continue to get wealth and children\'s happiness. There is a possibility of ups and downs in your sister\'s domestic life.',
  'Ra-4':
    'According to Lal Kitab Year horoscope, this year Rahu House is number 4 in your horoscope. House number 4 is influenced by the Moon. For this reason, one of your houses or a vehicle will be sold at a high price. You are a person who cooks a pastime. You are heavy on your grandfather and uncle. You will continue to help your relatives. After 24 years, there is a possibility of your marriage and wealth. You should not build a water tank in your house. You do not even have to fill up the stock of coal bags. Do not make tandoors inside the ground. You do not even have to change the roof of your house.',
  'Ra-5':
    'According to Lal Kitab Year horoscope, this year Rahu House is number 5 in your horoscope. House Number 5 is the Sun\'s own house. Children are also seen from House number 5. For this reason, your wife\'s miscarriage will also happen once. Your studies will also be interrupted. Your father is likely to die when you are 21 or 42 years old. You should not rejoice at the birth of your child. This is bad for your child. It will be auspicious for you to keep a solid silver elephant in the house.',
  'Ra-6':
    'According to Lal Kitab Year horoscope, this year Rahu House is in number 6 in your horoscope. House number 6 is Rahu\'s own house. That is why only the inauspicious effect of Rahu has been seen here. For this reason, you cannot be troubled by disease, debt and enemy. You will continue to get progress in business or job, but you will continue to get transferred. If someone interrupts you before going on any work, then your Rahu starts giving inauspicious results. You are likely to have a mole near your navel. The financial condition of your in-laws can also be seen in the lack of comfort.',
  'Ra-7':
    'According to Lal Kitab Year horoscope, this year Rahu House is number 7 in your horoscope. House number 7 is the house of Venus, so the family life of the native does not go well when Rahu is here; either the native\'s wife is ill or the native can also get divorced or the native\'s wife is older than the native. The person suffers from electrical work. If you get married at the age of 21, there is a possibility of divorce or death. Due to Rahu being in House number 7, there can also be a loss of money. Keeping a dog here is harmful to the native.',
  'Ra-8':
    'According to Lal Kitab Year horoscope, this year Rahu House is number 8 in your horoscope. House number 8 is Mars\'s own house. Here Rahu gives more of its auspicious effect. There are definitely obstacles in the work of the native. There is also a loss in business. If there is a big black or one-eyed person in the family, then the effect of Rahu gets worse. Someone in the house may have asthma. The person also has stomach disease himself. If the person earns money dishonestly, then the person suffers 8 times the loss.',
  'Ra-9':
    'According to Lal Kitab Year horoscope, this year Rahu House is number 9 in your horoscope. House number 9 is the house of the planet Jupiter and Rahu is the cause of smoke. For this reason, the native does not believe in religion. The native does not have any special respect in the society. Due to Rahu being in number 9, the native may also lose children. If one dog dies, the person should immediately adopt another dog. This karma can last up to 11 times. If you keep a dog, the age of the native\'s child will increase. The native should live with his ancestral family and maintain it with his in-laws.',
  'Ra-10':
    'According to Lal Kitab Year horoscope, this year Rahu House is in number 10 in your horoscope. House number 10 is Saturn\'s own house. For this reason, you can be a good trader. You can be in a good position in a government job. You will live a long life but your mother\'s health may be bad. If you are stingy, it will be inauspicious for you. You may have a headache. Sometimes the unmistakable effect of Rahu has also been seen on the wealth of the native.',
  'Ra-11':
    'According to Lal Kitab Year horoscope, this year Rahu House is in number 11 in your horoscope. House number 11 is Saturn\'s own house and Jupiter also has its influence on this house. Your dad or grandfather may be harmed. After your birth, your father\'s income will be affected. You do your job carefully and smartly. The company of your friends also remains, but by doing lowly work and getting money from lowly people, you will suffer. It is not possible for you, your father and your son to live together.',
  'Ra-12':
    'According to Lal Kitab Year horoscope, this year Rahu House is in number 12 in your horoscope. House number 12 is the home of Jupiter; here rest and salvation are also found. Jupiter and Rahu are enemies of each other. Due to Rahu being in House number 12, you do not get sleep or rest. You can be a person who studies well. Due to Rahu, you are also likely to face a lawsuit or jail. Your expenses can be very high. There may also be a problem in the honor of the person again and again. You may also have to spend on your daughter or sister or repay the loan they have taken.',
  'Ke-1':
    'According to Lal Kitab Year horoscope, this year Ketu is number 1 in your horoscope. House number 1 is influenced by Sun and Mars, so the effect of Ketu has been seen weak. You engage people in your conversations without any reason; that is, you ask them more questions. The fruit of Ketu has been seen well here. You are more likely to have a son and a son of your sister. Even if you have been transferred, your trip may be postponed at the last minute. You are likely not to be born near your father\'s house. You may have a blood-related disease.',
  'Ke-2':
    'According to Lal Kitab Year horoscope, this year Ketu House is number 2 in your horoscope. House number 2 is influenced by Ketu, so you can benefit from travel business. You can\'t sit in one place and work. You are likely to get a good wife\'s happiness. You will transact millions of rupees in business. But they will not be able to accumulate wealth. After 24 years, you will start earning yourself and your life will be spent happily.',
  'Ke-3':
    'According to Lal Kitab Year horoscope, this year Ketu House is number 3 in your horoscope. House number 3 is the house of Mercury and Ketu gives an inauspicious effect here. Because of this, you have pain in the spine. There may also be boils and pimples or skin diseases. The results of your brothers\' in-laws may also be slow. The hair of some elderly person in your house should be white. You should not keep your brother-in-law in your house together. You should not live in a south-facing house. You should also not travel without talking.',
  'Ke-4':
    'According to Lal Kitab Year horoscope, this year Ketu House is number 4 in your horoscope. House Number 4 is the house of the Moon. The effect of Ketu is not good here. You may delay the birth of a son or you will be less likely to have a son. Ketu also reduces the happiness of the mother here. The person may also suffer from diabetes. You will also continue to suffer from frequent lack of money in business. If you put earrings in your ears, it is auspicious for you. Seeking advice from others can also be harmful. Your neighbour may also be at a disadvantage.',
  'Ke-5':
    'According to Lal Kitab Year horoscope, this year Ketu House is number 5 in your horoscope. House number 5 is Surya\'s own house and he also sees the child from this house. But Ketu is also the factor of having a son, so the chances of having a son increase for you. If you keep your behavior right, it will be auspicious for you. Your relationship with your wife will also be good. If you have a respiratory disease or asthma, then you should take the remedy of the planet Jupiter.',
  'Ke-6':
    'According to Lal Kitab Year horoscope, this year Ketu House is number 6 in your horoscope. House number 6 is the house of Mercury and gives the fruit of the lowly here. You may have disease below the navel and it may be difficult to detect. If your Jupiter is auspicious, then your age will be beneficial for your business and your children. There is a problem with your feet or there may be more work to move around, which is inauspicious for you and your wife. You can help your father, which will benefit you.',
  'Ke-7':
    'According to Lal Kitab Year horoscope, this year Ketu House is number 7 in your horoscope. House number 7 is Venus\'s own house. Ketu and Venus are friends with each other. Here Ketu gives more auspicious effects. Making false promises or slipping away can give you a bad impression. Your wife can have as many children as she has siblings. At the age of 24, you have the possibility of wealth rain. You will not have trouble with your enemies. They will automatically move away from you. Even after the second child, you will continue to shower money. There may be a delay or interruption in your marriage; you should get married.',
  'Ke-8':
    'According to Lal Kitab Year horoscope, this year Ketu House is number 8 in your horoscope. House number 8 is the house of Mars and this house is also called Crematorium. Due to this, your wife\'s health may deteriorate. You may also suffer from the loss of child\'s happiness. You can see someone\'s death first. Your child may be a little late. If you have a child before the age of 34 and a second child after the age of 34, then you will not get the happiness of both children. You may have an upset stomach. You may also have joint pain.',
  'Ke-9':
    'According to Lal Kitab Year horoscope, this year Ketu House is number 9 in your horoscope. House number 9 is the house of Jupiter and Ketu considers Jupiter as his guru, so the auspicious results of Ketu are seen more here. You should do a big business only after taking the advice of your father or elder. If you respect your father, then it is good for you. It is good for you to keep helping your daughter, nephew and brother-in-law from time to time. You should keep gold at home so that your gold will continue to grow. You should take your son\'s advice. You can also give financial assistance to your maternal uncle\'s side.',
  'Ke-10':
    'According to Lal Kitab Year horoscope, this year Ketu House is number 10 in your horoscope. House number 10 is Saturn\'s own house. If your brother hurts you, you forgive them. It will be auspicious for you. You should keep a distance from the other woman. Keeping a dog will be auspicious for you. If Saturn is beneficial, then you can also become a famous player. If your child is having a bad effect, then before the age of 45, you should take a silver pot in the shape of a pitcher and fill it with honey and press it outside the house.',
  'Ke-11':
    'According to Lal Kitab Year horoscope, this year Ketu House is number 11 in your horoscope. House number 11 is Saturn\'s own house. At the time of having a son, your mother\'s eyes and chest may be adversely affected. You may not have got family wealth, but you can build your own property. Your wife may have a stillborn child. You are not a very courageous person and try to delay the work. If Saturn is not giving good results, then your children and your house will be badly affected.',
  'Ke-12':
    'According to Lal Kitab Year horoscope, this year Ketu House is number 12 in your horoscope. House number 12 is influenced by Jupiter and it is also the open sky. Ketu is exalted here. For this reason, the effect of Ketu is good. You are a person who is going to progress in your business. You will get more money from the work of building a house, traveling. Your son will be lucky for you. Your domestic life will be spent well. You are likely to inherit the property from your father. If you have a dog that dies, then you should keep a dog at home, which is auspicious for you.',
};

/** Remedies/solutions for each planet-house (from LAL KITAB ENGLISH doc) — show as bullet points under description */
const PLANET_IN_HOUSE_REMEDIES: Record<string, string[]> = {
  'Su-1': ['If the 5th house in your horoscope is empty, then you should wear the objects of the planets friends of the Sun', 'You should get married before the age of 24', 'You should install a hand pump or natural water source in your ancestral house', 'You should build a dark closet on the left side of your house'],
  'Su-3': ['Keep your behavior right', 'Help poor children. Seek the blessings of the women of house', 'Take full care of the women of the house', 'Stay away from sins and bad deeds'],
  'Su-4': ['Even if you have left the ancestral house, you should still feed bread to the blind around that house', "Don't drink alcohol and eat meat", 'Wear a copper coin tied in a khaki thread around your neck', 'Work on gold, silver and cloth', 'Do not work with iron and wood'],
  'Su-5': ['It will be auspicious to serve three types of dogs i.e., brother-in-law, son-in-law and grandson etc', 'You should make the kitchen in the east direction of your house', 'Serve Birds and Chickens'],
  'Su-6': ['You should feed jaggery to monkeys', 'After eating dinner, the fire of the stove should be extinguished with milk', 'Ants should be fed seven pulses sawdust', 'Gangajal or silver should be installed in the house', 'Keeping a dog will be auspicious for you'],
  'Su-7': ['Drink jaggery and water while leaving the house', 'Put 1/4 or part of your bread in the fire', 'Serve the black cow', 'You should give your wife to wear a gold clip in her hair, that is, make the wife wear gold on her head'],
  'Su-8': ['Worship Lord Vishnu', 'Should not live in a south-facing house', 'Donate 800 grams of wheat and 800 grams of jaggery to the temple for 8 consecutive days from Sunday. Keep in mind Chaturthi, Navami and Chaudas, do not start this work on these dates', 'Put 8 copper coins on the burning pyre in the crematorium', 'Start any new work by eating jaggery and drinking water or consume a little jaggery and water while leaving the house every morning'],
  'Su-9': ['Never donate rice, silver or milk items', 'Never sell old brass utensils', 'Control your anger and treat everyone equally'],
  'Su-10': ["Don't wear blue", 'Throw a copper coin in running water for 43 days', 'Always keep Ganga water at your home', 'Install a hand pump inside the house'],
  'Su-11': ['Keep radish, carrot and turnip near your head for 43 days and donate it to the temple in the morning', "Don't forget to use alcohol, meat and eggs", 'Buy a goat from a butcher and release it in the wild, or donate five milking goats that are equal to your weight'],
  'Su-12': ['Perform religious activities from time to time', 'Sunlight is essential in your home', "Don't waste money on the property", 'Do not have too much relationship with in-laws'],
  'Mo-1': ['It is auspicious for you to give water to the roots of big trees', 'You should put copper nails on all four legs of the bed', 'Milk and water should be drunk in a silver vessel', 'Do not use milk and water in glass utensils', 'Donate milk and do not do milk business at all', 'Take silver or rice from the mother and keep it in the house', 'Do not build a house before 24 years', 'Keep the cow in the house in the 24th year or take the services of a maid'],
  'Mo-2': ['Donate green clothes to girls for 43 days', 'Serve the elderly woman of the family', 'Press silver bricks and silver items into the foundation of the house', 'Keep some part of the house made of raw soil', 'Take rice and silver from your mother and tie it in a white cloth and keep it safe in the house'],
  'Mo-3': ['Do not take money from your daughter and in-laws', 'Do Kanyadaan', 'Worship the form of Maa Durga', 'It will be auspicious for you to serve and fulfill the needs of the women of the house'],
  'Mo-4': ['Trading milk is harmful to you', 'Burning milk is harmful to you, i.e. making mawa is harmful to you', 'Welcome the guest who comes to the house with milk', 'Seek the blessings of elderly women in the house', 'You are not afraid of spending, the more money you spend, the more money will come to you', 'Avoid Wrong Mannered Women'],
  'Mo-5': ['Selfishness and greed are inauspicious for you', 'Walking in Hilly Places is auspicious for you', 'On Monday, tie rice and sugar candy in a white cloth and throw it in running water', 'Make sure to consume jaggery before leaving the house', "Don't speak ill of anyone", 'Do not abuse anyone', 'Doing auspicious work for public welfare will increase your wealth'],
  'Mo-6': ['You should feed your father with your own hands', "Donating items of the Moon's friendly planets such as Sun, Mars and Jupiter to the temple will be auspicious for you", 'You can donate milk to the temple', 'Arrangements for water in hospitals and crematoriums will be auspicious for you; donating water to any other place will be inauspicious', 'You can use yogurt or paneer', "You should not drink milk at night", 'Serving the rabbit will be auspicious for you'],
  'Mo-7': ['Keep in mind that you are not married at the age of 24', 'At the time of marriage, take silver items from the in-laws', 'Keep water equal to your weight at home', "Don't trade milk and water", "Don't make milk mawa", "Don't burn milk"],
  'Mo-8': ['Stay away from lies and deceit', 'Offer 1.25 kg of gram dal on the Shivling in the temple', 'Arrange water in the crematorium', 'Do not build a house in a place where there is already a well', 'Filled the bottle with milk and pressed it in the forest', 'Donate milk at the time of donation of ancestors', 'Stay away from other women', 'Nose-piercing will be auspicious for you', 'Do not consume meat and alcohol', "Don't gamble betting"],
  'Mo-9': ['Keep your character right', "If you are a doctor, don't give free medicines", "Don't keep dairy animals at home", 'Do not drink milk at night', 'Do not have too much relationship with your in-laws', "Don't help widows", 'Keep rainwater in the house for 10 years', 'Go to any temple every day'],
  'Mo-10': ["If you are a doctor, don't give free medicines", "Don't keep dairy animals at home", 'Do not drink milk at night', 'Do not have too much relationship with your in-laws', "Don't help widows", 'Keep rainwater in the house for 10 years', 'Go to any temple every day'],
  'Mo-11': ['Your mother should move away when you have a baby or not see your baby\'s face for 43 days', 'Never use the hand pump', 'Donate milk at Bhairav Temple', 'White Peda Feed 11 children or 11 persons', 'Go to the temple barefoot for 43 days', 'Do not worship at night'],
  'Mo-12': ['Keep rainwater in the house', 'Start any work only after drinking water', 'Wear gold in the ear', 'Wear gold, silver and copper rings'],
  'Ma-1': ["Don't work with your brother-in-law", 'The service of people is auspicious for you', 'Donate gram dal or gram flour etc. to the temple', "Don't say anything bad about anyone", 'Do not take goods from anyone for free', 'If you take stuff from someone for free, your blood will turn into water'],
  'Ma-2': ['Feed jaggery to children in the afternoon', 'Helping others will bring your luck', 'If you insult your brother, you may be harmed', 'Donate rice, silver, milk and water to the temple or to the Gurudwara', "Arrange water in the in-laws' house"],
  'Ma-3': ['Do not show your arrogance in any work, it is not auspicious for you', 'It would be auspicious to keep ivory at home', 'Honey and sugar business will be inauspicious for you'],
  'Ma-4': ['Brush your teeth with water every morning', 'Offer sweet milk on the root of the banyan tree and tilak with wet soil', 'Serving Brahmin, Mother and Monkey is auspicious for you', 'Fill honey in an earthen pot and press it in the crematorium', 'Sleeping on the skin of deer is auspicious for you', 'If the door of your house is in the south direction, then put 400 grams of nails in the door frame'],
  'Ma-5': ['Keep your behavior right', 'Serve the Elders', 'Planting neem saplings will be auspicious for you', 'Avoid transgender intercourse'],
  'Ma-6': ['Help maternal uncle, aunt, mother, sister, girl and aunt etc. from time to time', 'Worship Lord Ganesha', 'At the time of the birth of the child, distribute snacks along with sweets', 'Take the remedy of Saturn', 'Feed the girls for 6 days'],
  'Ma-7': ['Do not plant a tree with broad leaves', "Don't raise goats and cows at home", 'Give red clothes to your aunt and sister after marriage'],
  'Ma-8': ['Give sweet bread to dogs in the tandoor for 43 days. Keep in mind that there should be no iron on the bread', 'Donate rice and gram dal to the temple', 'Do not keep tandoor in the house', "Don't keep ivory at home", 'Make sure to make a closet at the end of the house', 'Eating in the kitchen is auspicious for you', 'Do not insult a widow and keep seeking blessings from the widow', 'Make roti by splashing water on a hot griddle'],
  'Ma-9': ['You will not be punished by a woman if you do this', 'Donate milk, curd and silver to the temple'],
  'Ma-10': ['Do not sell the gold ornaments in the house', 'When boiling milk, make sure that the milk does not fall on the ground', 'Ancestral land should not be sold in property', 'If possible, serve the deer'],
  'Ma-11': ['Keeping honey in the house will be auspicious for you', 'Fill 2 glass jars with jaggery and press it in the desert', "Don't sell ancestral property"],
  'Ma-12': ['Feeding sweet bread to dogs is auspicious for you', 'Offering water to the sun by adding sweets is auspicious for you', 'The use of a red cap or handkerchief is auspicious for you', 'Donation of batashe in the temple is auspicious for you', 'It is auspicious for you to sleep at night near your head'],
  'Me-1': ['Sitting in one place and working is auspicious for you', 'Do not consume or use green things', 'Consumption of alcohol and eggs will be inauspicious for you', 'Consuming fish is highly inauspicious for you', "Don't keep the sister-in-law with you", 'Keep water near the head at night and put it in the peepal tree in the morning'],
  'Me-2': ['Wearing silver for 90 days or keeping your nose pierced for 96 hours will be auspicious for you', 'Do not raise sheep, goats and parrots', 'Brushing your teeth with alum will be auspicious for you', 'Do not trade the factors of the planet Mercury'],
  'Me-3': ['Give the sun water', 'You will benefit from wearing silver, coral, etc. around your neck', 'Take the blessings of the Virgos', 'Serve the Birds', 'Soak whole moong in water and feed the birds in the morning for 43 days', 'It is auspicious for you to give free asthma medicines'],
  'Me-4': ['Feed jaggery and chickpeas to the monkey', 'Wearing a silver chain for peace of mind is auspicious for you', 'Stay away from green objects and do not plant trees at home'],
  'Me-6': ["Your sister and daughter's in-laws should not be in the north direction", 'Before starting any work, you should take the blessings of the girls', "Wearing a silver ring on your wife's left hand will be auspicious for you", 'Bury the bottle of Ganga water in the field ground'],
  'Me-7': ['You should wear an emerald or diamond', "Don't trade partnerships with anyone", 'Respect and honor sisters as your mother', 'You will benefit from keeping milk or water on the roof', 'Do not change the place of worship in the house frequently', 'Do not break the stairs of the house again and again', 'You will benefit from pressing the items of Mars in the crematorium', "Don't let a girl wear red clothes in the house"],
  'Me-8': ['You will benefit from keeping milk or water on the roof', 'Do not change the place of worship in the house frequently', 'Do not break the stairs of the house again and again', 'You will benefit from pressing the items of Mars in the crematorium', "Don't let a girl wear red clothes in the house", 'Sleeping with fennel near your head will be auspicious for you', 'Do not take any amulet from any fakir or monk', 'Place the mushroom in an earthen pot and donate it to the temple', 'Parrots, goats never rear', "Don't use green items", 'Wearing a silver ring in the nose is auspicious for you', 'Keep the red colored pills with you', 'Do not sign any paper without reading it', 'Consuming alcohol, meat and eggs will be inauspicious for you'],
  'Me-9': ['Do not take any amulet from any fakir or monk', 'Place the mushroom in an earthen pot and donate it to the temple', 'Parrots, goats never rear', "Don't use green items", 'Wearing a silver ring in the nose is auspicious for you', 'Keep the red colored pills with you', 'Do not sign any paper without reading it'],
  'Me-10': ['Consuming alcohol, meat and eggs will be inauspicious for you', "You don't have to plant a money plant or a basil tree in your house"],
  'Me-11': ['Keep Ganga water in the house in a brass vessel', 'Keep your distance from green objects', 'Do not plant a broadleaf tree in the house', 'Holding the copper coin will be auspicious for you'],
  'Me-12': ['Apply saffron tilak every day', 'Control your speech', "Don't take a ring from anyone for free", 'Worshiping Lord Ganesha is auspicious for you', 'Putting yellow thread around your neck will be auspicious for you', 'Keeping a black or white colored dog is auspicious for you. Keep in mind that it should not be brown'],
  'Ju-1': ['Press Mars objects into the ground', "Don't take help from anyone", 'Believe in Your Destiny'],
  'Ju-2': ['You should help others', "Tie the Guru's items in a yellow cloth and donate them to the temple"],
  'Ju-3': ['Serve the girls and seek their blessings', 'Do not flatter others at all', 'Apply turmeric and saffron tilak'],
  'Ju-4': ['Obey elders and do not insult them', 'Offer water to the peepal tree', "Don't drink meat and alcohol", "Don't tell false things about yourself", 'Do not let Rahu and Ketu be inauspicious'],
  'Ju-5': ['Do not take money from anyone in the name of religion', 'Worship Lord Ganesha', 'Stay away from other women'],
  'Ju-6': ['It will be auspicious to donate the items of Guru to the temple', 'Keep your father with you or stay with him', 'Worship Girls', 'Pour Sweet Bread to the Dog', 'Do not keep a garland of basil at home, it will have a bad effect', 'Do not build a temple at home', 'Stay away from other women', 'Avoid Stray Sadhus', 'Remedying the moon is auspicious for you'],
  'Ju-7': ['Do not keep a garland of basil at home, it will have a bad effect', 'Do not build a temple at home', 'Stay away from other women', 'Avoid Stray Sadhus', 'Remedying the moon is auspicious for you', 'Bathing in rainwater is auspicious for you', 'Wear a gold necklace around your neck', 'Planting a peepal tree in the crematorium is auspicious for you', 'Donate yellow or white items', 'Help poor people and donate', 'If the father is sick and in trouble, then definitely help', 'It will be auspicious to donate the items of Jupiter and Venus to the temple', 'Always tell the truth', "You shouldn't drink alcohol", 'You should take a bath in the Ganges'],
  'Ju-8': ['Wear a gold necklace around your neck', 'Planting a peepal tree in the crematorium is auspicious for you', 'Donate yellow or white items', 'Help poor people and donate'],
  'Ju-9': ['Always tell the truth', "You shouldn't drink alcohol", 'You should take a bath in the Ganges', 'Pilgrimage is a must', 'Following the religion will be auspicious for you', 'Piercing the nose, wearing silver is auspicious for you'],
  'Ju-10': ['Never build a temple in the house', "Don't consume alcohol, meat, and eggs; donate almonds to Temple", 'Do not have a relationship with another woman', 'Copper coin will be fine if you float it in the running water'],
  'Ju-11': ['Keeping a yellow handkerchief in your pocket is auspicious for you', 'Offer water to the peepal tree daily', 'Keep your behavior right', "Don't keep your wife separated"],
  'Ju-12': ["Don't lie to anyone or cheat on anyone", 'You will benefit from doing good to others', 'A saffron mark on the forehead every day', "Don't do bad to anyone", "Don't insult the saints"],
  'Ve-1': ['Stay away from housemaids or strangers', 'Keep your behavior right'],
  'Ve-2': ['It is auspicious for you to work with the advice of your wife', 'Gold business can cause losses for you', 'Throwing things like fennel, honey and sugar etc. in running water is auspicious for you', 'Do not light a ghee lamp in the house', 'It is auspicious for you to feed 2 kg of potatoes yellow with turmeric and feed it to the cow'],
  'Ve-3': ['It is auspicious for you to use Mars objects', 'Respecting a woman and not insulting her will give you auspicious results', 'Never play music at home'],
  'Ve-4': ["Putting the Moon's remedy or Jupiter's objects in the well is auspicious for you", 'You should not dig a well in the house', 'Should be the remedy of the Guru', "Don't get drunk", 'You should hide your bad habits and boast about your virtues'],
  'Ve-5': ['Serving the cow and feeding it is auspicious for you', 'It is auspicious for you to keep water in the house by filling it in a silver vessel', 'Get married according to your parents\' wishes', 'Keep your character right', 'Avoid Love Cycles'],
  'Ve-6': ['Women should be respected', 'Donate milk and rice at the place of worship', 'Keep good manners and keep a distance from foreign women', 'Put a gold clip in your wife\'s hair', "Don't let your wife walk barefoot on the ground"],
  'Ve-7': ['You should seek the blessings of your parents every day', 'Serving the red cow is auspicious for you', 'It is auspicious for you to donate bronze utensils to the temple on Friday'],
  'Ve-8': ['Never take donations', 'Marriage after 25 years is auspicious for you', 'Serving the black cow is auspicious for you', 'Donate Jimikand or Carrot (800 grams or 8 kg) to the temple'],
  'Ve-9': ['Do not consume white yogurt, eat something mixed with it', 'It is auspicious for you to get married to your son only after the age of 25 years', 'Serving the white coloured cow will give inauspicious results', 'Serving the black cow is auspicious for you', 'Wear silver bangles in red color to your wife, this will benefit you'],
  'Ve-10': ['Consuming alcohol is bad for you', 'Taking the remedy of Saturn is auspicious for you', 'Stay away from other women', "Don't kill fish"],
  'Ve-11': ['Donating oil on Saturday is auspicious for you', 'Donate Curd to Temple', 'Doing the remedy of Mercury is auspicious for you', 'Do not give the key to the locker to the woman'],
  'Ve-12': ['Light a lamp of desi ghee in your home', 'It is auspicious for you to give respect and love to your wife', 'Serving the white cow will bring auspicious results', 'Do not have any relationship with the objects of Rahu'],
  'Sa-1': ['Donating iron tongs is auspicious for you', 'Donate mustard oil'],
  'Sa-3': ['Keeping a dog in the house is auspicious for you', 'When building a house, make sure to build a dark closet', 'Nail the doorstep of the house', 'By taking the remedy of Ketu, you will get money'],
  'Sa-4': ['You will benefit from raising buffaloes or feeding them bread', 'Serve the Workers', 'Stay away from other women', 'Never drink milk at night', 'Never wear black', 'Stay away from the green'],
  'Sa-5': ["Don't distribute sweets when a child is born; if you share it, make it salty", 'You will benefit from taking the remedy of Mercury', 'You should not build your house until you are 48 years old', 'If your child builds a house on his own, then it is auspicious for you'],
  'Sa-6': ['Donating shoes to a poor person will benefit you'],
  'Sa-7': ["Don't partner with anyone", 'Keep honey in a brass pot in the house', 'Serve the black cow', 'Stay away from a foreign woman, otherwise the child will suffer'],
  'Sa-8': ['While bathing, it will be auspicious for you to take a bath by mixing milk in water', 'Throw 8 kg of urad dal in running water', 'Put dates in the water'],
  'Sa-9': ['If you are upset after the death of your parents, then put a stone anywhere in the house', 'Create a dark closet in the back of the house', 'The roof of the house should always be kept clean'],
  'Sa-10': ['Cover your head with a white hat or cloth', 'Chickpea dal soaked in water for 40 days', 'Respect others', 'Do not consume alcohol, meat and eggs'],
  'Sa-11': ['Stay away from other women', 'Do not make the gate of house in the south direction', 'Remedy the Guru', 'Keep a silver brick at your house', 'Donate oil by seeing your shadow in oil'],
  'Sa-12': ["Don't lie", 'Stay away from other women', 'Do not make a window or door behind the house', 'You should keep your behavior right', 'Person should make a dark room in his house', 'You should not wear black and blue clothes', 'Bathing with milk is auspicious for you', 'You should wear silver around your neck', 'Donate items related to the Sun', 'Drain the coconut in running water'],
  'Ra-1': ['You should not wear black and blue clothes', 'Bathing with milk is auspicious for you', 'You should wear silver around your neck', 'Donate items related to the Sun', 'Drain the coconut in running water', 'Keep barley near your head while sleeping at night and let it flow in the water in the morning'],
  'Ra-2': ['Apply turmeric or saffron tilak', 'Wearing gold will be auspicious for you', 'Maintain a good relationship with your mother in the house', 'Keep any silver item with you, you will get auspicious results'],
  'Ra-4': ["Don't cook under the stairs of the house", 'Wearing silver is auspicious for you', 'Take a bath in the Ganges', 'Throw 400 grams of coriander in running water', 'Throwing 500 grams of almonds in running water is auspicious for you'],
  'Ra-5': ['If there is a problem related to the child, then offer almonds in the temple for 43 days', 'Stay away from other women', 'Do not consume alcohol, meat and eggs at all', 'If your Rahu is not good, then you should marry your wife again'],
  'Ra-6': ['Do not install black glass windows in the house', 'Help your siblings'],
  'Ra-7': ['At the time of marriage, take silver bricks from the in-laws\' house', 'Never have a dog', 'If you are married at the age of 21, then fill a pot with Ganga water and donate it to the temple'],
  'Ra-8': ['Never lie', 'Drain 4 coconuts in running water', 'Put 8 copper coins in the furnace'],
  'Ra-9': ["Don't wear black and blue clothes", 'You should keep your hair braided', 'Apply saffron tilak daily', 'Respect your father and seek his blessings', 'You will benefit from bowing your head daily in the temple', 'Keep your relationship with your in-laws good'],
  'Ra-10': ["Don't drink milk at night", 'Keeping a bruise on your head is auspicious for you', 'Mars Remedy', 'Keep your head covered', 'Wearing the cap or turban is auspicious for you', 'Get food for 10 blind people with your own hands'],
  'Ra-11': ["Donate the Guru's belongings", 'Do not eat onions on Thursday', 'On the 8th birthday, throw four dry coconuts in running water'],
  'Ra-12': ['Keep fennel, sugar or moong dal under the pillow at night', 'It is auspicious for you to sit and eat where the food is prepared', "You don't have to think too much", 'Make sure to build a dark closet in your house'],
  'Ke-1': ['Feed jaggery to the monkey', 'Remedy the moon', 'Keep a red handkerchief in your pocket', 'Donate black and white blankets to temple'],
  'Ke-2': ['Apply a saffron tilak on the forehead'],
  'Ke-3': ['Throw rice, jaggery and milk in running water', 'Wearing gold in the ears is auspicious for you', 'Do not keep the sister-in-law or brother-in-law with you in the house', "Don't use the green"],
  'Ke-4': ['Wear silver for peace of mind', 'Throw yellow lemons in running water', 'Donate Surya items and seek blessings'],
  'Ke-5': ['Donate Moon and Mars items', 'Shraddha of ancestors should be done properly', 'Apply saffron tilak', 'Should be the remedy of Guru'],
  'Ke-6': ["Don't drink milk alone, drink it with saffron", 'Donate black, white blankets to the temple', 'Remedy the Guru', 'Wear the gold ring in the left hand', 'Raising a dog is auspicious for you'],
  'Ke-7': ["Don't make false promises to anyone", "Don't be proud of yourself", 'Drain 4 lemons in running water for 4 days', 'Never speak bitterly'],
  'Ke-8': ['If you keep your behavior right, your wife\'s health will be good', 'Worship Lord Ganesha', 'Feed Bread to the Dog', 'Donate blankets to temples'],
  'Ke-10': ["Don't do evil to your brothers", 'Fill honey in a pot-shaped vessel and keep it in the house'],
  'Ke-11': ['Placing radish near your wife\'s head at night and giving it to a religious place in the morning will have a good effect on your child', 'Add saffron to milk and drink it', 'Raising a black dog is auspicious for you', "Donate Jupiter's items"],
  'Ke-12': ['Raising a dog is auspicious for you', 'If your child is upset, then take the remedy of Rahu', 'Keep your behavior right', 'You should worry about your child', 'If your pet dog dies, it is necessary to bring another dog within 43 days'],
};

/**
 * Get house description (significations, title, etc.) for the given language.
 */
export function getHouseDescription(
  houseNumber: number,
  lang: DescriptionLanguage = 'en'
): HouseDescription | undefined {
  const source = lang === 'hi' ? LAL_KITAAB_HOUSE_DESCRIPTIONS_HI : LAL_KITAAB_HOUSE_DESCRIPTIONS;
  return source[houseNumber];
}

/**
 * Get description for a planet in a house (Lal Kitaab).
 * planetShort: Su, Mo, Ma, Me, Ju, Ve, Sa, Ra, Ke
 * When chartType is 'birth', uses birth-chart data (Hindi from docx; English translated from that Hindi only).
 * When chartType is 'varshphal' or omitted, uses Varshphal (year horoscope) data.
 */
export function getPlanetInHouseDescription(
  planetShort: string,
  houseNumber: number,
  lang: DescriptionLanguage = 'en',
  chartType: LalKitaabChartType = 'varshphal'
): string | undefined {
  const key = getPlanetInHouseKey(planetShort, houseNumber);
  if (chartType === 'birth') {
    if (lang === 'hi') {
      const birthHi = BIRTH_CHART_PLANET_IN_HOUSE_HI[key];
      if (birthHi) return birthHi;
      return PLANET_IN_HOUSE_HI[key];
    }
    return BIRTH_CHART_PLANET_IN_HOUSE[key];
  }
  if (lang === 'hi' && PLANET_IN_HOUSE_HI[key]) return PLANET_IN_HOUSE_HI[key];
  return PLANET_IN_HOUSE[key];
}

/** Planet-in-house remedies. When chartType is 'birth', uses birth-chart remedies (Hindi from docx; English translated from that Hindi). */
export function getPlanetInHouseRemedies(
  planetShort: string,
  houseNumber: number,
  lang: DescriptionLanguage = 'en',
  chartType: LalKitaabChartType = 'varshphal'
): string[] {
  const key = getPlanetInHouseKey(planetShort, houseNumber);
  if (chartType === 'birth' && lang === 'hi') {
    const birthRem = BIRTH_CHART_PLANET_IN_HOUSE_REMEDIES_HI[key];
    if (birthRem?.length) return birthRem;
    return PLANET_IN_HOUSE_REMEDIES_HI[key] ?? [];
  }
  if (chartType === 'birth' && lang === 'en') {
    return BIRTH_CHART_PLANET_IN_HOUSE_REMEDIES[key] ?? [];
  }
  if (lang === 'hi' && PLANET_IN_HOUSE_REMEDIES_HI[key]?.length) return PLANET_IN_HOUSE_REMEDIES_HI[key];
  return PLANET_IN_HOUSE_REMEDIES[key] ?? [];
}

/**
 * Get full planet name for display in the given language.
 */
export function getPlanetDisplayName(planetShort: string, lang: DescriptionLanguage = 'en'): string {
  const source = lang === 'hi' ? PLANET_NAMES_HI : PLANET_NAMES;
  return source[planetShort] || planetShort;
}
