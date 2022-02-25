/*
 Navicat Premium Data Transfer

 Source Server         : bookwormsDB
 Source Server Type    : Oracle
 Source Server Version : 190000
 Source Host           : localhost:1521
 Source Schema         : C##BOOKWORMS

 Target Server Type    : Oracle
 Target Server Version : 190000
 File Encoding         : 65001

 Date: 25/02/2022 12:24:23
*/


-- ----------------------------
-- Table structure for AUTHOR
-- ----------------------------
-- DROP TABLE "C##BOOKWORMS"."AUTHOR";
CREATE TABLE "C##BOOKWORMS"."AUTHOR" (
  "AUTHOR_ID" NUMBER(20,0) VISIBLE NOT NULL,
  "FIRST_NAME" VARCHAR2(25 BYTE) VISIBLE NOT NULL,
  "LAST_NAME" VARCHAR2(25 BYTE) VISIBLE NOT NULL,
  "BIO" VARCHAR2(3500 BYTE) VISIBLE,
  "BORN" DATE VISIBLE NOT NULL,
  "FOLLOWER_COUNT" NUMBER(6,0) VISIBLE DEFAULT 0,
  "EMAIL" VARCHAR2(30 BYTE) VISIBLE NOT NULL,
  "PHOTO" VARCHAR2(50 BYTE) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of AUTHOR
-- ----------------------------
INSERT INTO "C##BOOKWORMS"."AUTHOR" VALUES ('1', 'Chad', 'Devon', 'An up and coming young writer with loads to offer', TO_DATE('1999-06-17 23:36:11', 'SYYYY-MM-DD HH24:MI:SS'), '2', 'cdevon@gmail.com', NULL);
INSERT INTO "C##BOOKWORMS"."AUTHOR" VALUES ('2', 'Martha', 'Stewart', 'A young writer set to break the stereotypes with her thought provoking ideas', TO_DATE('1991-11-14 23:36:17', 'SYYYY-MM-DD HH24:MI:SS'), '1', 'marthas@yahoo.com', NULL);
INSERT INTO "C##BOOKWORMS"."AUTHOR" VALUES ('25', 'Roald', 'Dahl', 'Roald Dahl was a British novelist, short story writer, and screenwriter.

Born in north Cardiff, Wales, to Norwegian parents, Dahl served in the Royal Air Force during the Second World War, in which he became a flying ace and intelligence agent. He rose to prominence in the 1940s with works for both children and adults, and became one of the world''s bestselling authors. His short stories are known for their unexpected endings, and his children''s books for their unsentimental, often very dark humour. ([Source][1].)


  [1]: http://en.wikipedia.org/wiki/Roald_Dahl', TO_DATE('1916-09-13 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '0', 'http://www.roalddahl.com/', '25.jpg');
INSERT INTO "C##BOOKWORMS"."AUTHOR" VALUES ('26', 'J. K.', 'Rowling', 'Joanne "Jo" Murray, OBE (née Rowling), better known under the pen name J. K. Rowling, is a British author best known as the creator of the Harry Potter fantasy series, the idea for which was conceived whilst on a train trip from Manchester to London in 1990. The Potter books have gained worldwide attention, won multiple awards, sold more than 400 million copies, and been the basis for a popular series of films.', TO_DATE('1965-07-31 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '3', 'http://www.jkrowling.com/', '26.jpg');
INSERT INTO "C##BOOKWORMS"."AUTHOR" VALUES ('27', 'George R. R.', 'Martin', 'George Raymond Richard Martin (born September 20, 1948), sometimes referred to as GRRM, is an American author and screenwriter of fantasy, horror, and science fiction. He is best known for his ongoing *A Song of Ice and Fire* series of epic fantasy novels.

Critics have described Martin''s work as dark and cynical. His first novel, Dying of the Light, set the tone for most of his future work; it is set on a mostly abandoned planet that is slowly becoming uninhabitable as it moves away from its sun. This story, and many of Martin''s others, have a strong sense of melancholy. His characters are often unhappy, or at least unsatisfied - trying to stay idealistic in a ruthless world. Many have elements of tragic heroes in them. Reviewer T. M. Wagner writes, "Let it never be said Martin doesn''t share Shakespeare''s fondness for the senselessly tragic." This gloominess can be an obstacle for some readers. The Inchoatus Group writes, "If this absence of joy is going to trouble you, or you’re looking for something more affirming, then you should probably seek elsewhere."

([Source][1])


  [1]: http://en.wikipedia.org/wiki/George_R._R._Martin', TO_DATE('1948-09-20 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1', 'http://www.georgerrmartin.com/', '27.jpg');
INSERT INTO "C##BOOKWORMS"."AUTHOR" VALUES ('28', 'Khaled', 'Hosseini', 'Hosseini was born in Kabul, Afghanistan, in 1965. In 1970 Hosseini and his family moved to Iran where his father worked for the Embassy of Afghanistan in Tehran. In 1976, when Hosseini was 11 years old, Hosseini''s father obtained a job in Paris, France, and moved the family there. They were unable to return to Afghanistan because of the Saur Revolution. They sought political asylum in the United States and made their residence in San Jose, California.  Hosseini graduated from Independence High School in San Jose in 1984 and enrolled at Santa Clara University, where he earned a bachelor''s degree in biology in 1988. The following year, he entered the University of California, San Diego, School of Medicine, where he earned his M.D. in 1993. He completed his residency in internal medicine at Cedars-Sinai Medical Center in Los Angeles in 1996. He practiced medicine for over ten years, until a year and a half after the release of The Kite Runner.
Hosseini is currently a Goodwill Envoy for the United Nations High Commissioner for Refugees (UNHCR). He has been working to provide humanitarian assistance in Afghanistan through the Khaled Hosseini Foundation. He lives in Northern California with his wife, Roya, and their two children (Harris and Farah).', TO_DATE('1965-03-04 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1', 'https://khaledhosseini.com/', '28.jpg');
INSERT INTO "C##BOOKWORMS"."AUTHOR" VALUES ('29', 'John', 'Green', 'John Green''s first novel, Looking for Alaska, won the 2006 Michael L. Printz Award presented by the American Library Association. His second novel, An Abundance of Katherines, was a 2007 Michael L. Printz Award Honor Book and a finalist for the Los Angeles Times Book Prize. His next novel, Paper Towns, is a New York Times bestseller and won the Edgar Allen Poe Award for Best YA Mystery.  In 2007, John and his brother Hank were the hosts of a popular internet blog, "Brotherhood 2.0," where they discussed their lives, books and current events every day for a year except for weekends and holidays.', TO_DATE('1977-08-24 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '0', 'www.johngreenbooks.com/', '29.jpg');

-- ----------------------------
-- Table structure for AUTHOR_GENRE
-- ----------------------------
-- DROP TABLE "C##BOOKWORMS"."AUTHOR_GENRE";
CREATE TABLE "C##BOOKWORMS"."AUTHOR_GENRE" (
  "AUTHOR_ID" NUMBER(20,0) VISIBLE,
  "GENRE_ID" NUMBER(20,0) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of AUTHOR_GENRE
-- ----------------------------
INSERT INTO "C##BOOKWORMS"."AUTHOR_GENRE" VALUES ('1', '1');
INSERT INTO "C##BOOKWORMS"."AUTHOR_GENRE" VALUES ('2', '1');
INSERT INTO "C##BOOKWORMS"."AUTHOR_GENRE" VALUES ('26', '2');
INSERT INTO "C##BOOKWORMS"."AUTHOR_GENRE" VALUES ('27', '3');
INSERT INTO "C##BOOKWORMS"."AUTHOR_GENRE" VALUES ('29', '4');
INSERT INTO "C##BOOKWORMS"."AUTHOR_GENRE" VALUES ('25', '5');
INSERT INTO "C##BOOKWORMS"."AUTHOR_GENRE" VALUES ('26', '5');
INSERT INTO "C##BOOKWORMS"."AUTHOR_GENRE" VALUES ('1', '6');
INSERT INTO "C##BOOKWORMS"."AUTHOR_GENRE" VALUES ('2', '6');
INSERT INTO "C##BOOKWORMS"."AUTHOR_GENRE" VALUES ('28', '7');

-- ----------------------------
-- Table structure for BOOKS
-- ----------------------------
-- DROP TABLE "C##BOOKWORMS"."BOOKS";
CREATE TABLE "C##BOOKWORMS"."BOOKS" (
  "BOOK_ID" NUMBER(20,0) VISIBLE NOT NULL,
  "TITLE" VARCHAR2(50 BYTE) VISIBLE NOT NULL,
  "PREVIEW" VARCHAR2(2000 BYTE) VISIBLE,
  "ISMDB_RATINGS" NUMBER(2,1) VISIBLE,
  "PUBLISHER_ID" NUMBER(20,0) VISIBLE NOT NULL,
  "LATEST_EDITION" VARCHAR2(20 BYTE) VISIBLE,
  "COVER" VARCHAR2(50 BYTE) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of BOOKS
-- ----------------------------
INSERT INTO "C##BOOKWORMS"."BOOKS" VALUES ('21', 'The Departed', 'A reference to the popular movie "The Departed"', '3.4', '2', '5', NULL);
INSERT INTO "C##BOOKWORMS"."BOOKS" VALUES ('22', 'The Forest', 'The prequel to the popular "The Departed"', '3.2', '1', '1', NULL);
INSERT INTO "C##BOOKWORMS"."BOOKS" VALUES ('1', 'Schrodinger''s Cat', 'The immensely popular Sci-Fi that stretches the boundaries of human thinking', '4.5', '1', '2', NULL);
INSERT INTO "C##BOOKWORMS"."BOOKS" VALUES ('2', 'Into the Darkness', 'A story of a spacecrew and their encounter with a supermassive black hole', '4', '2', '5', NULL);
INSERT INTO "C##BOOKWORMS"."BOOKS" VALUES ('3', 'Solar Wars', 'The first in a series on Space Empires and Wars', '3', '1', '2', NULL);
INSERT INTO "C##BOOKWORMS"."BOOKS" VALUES ('5', 'Penny Dreadful', 'A Captivating horror spin on clowns. Sure to enthrall the readers', '3', '2', '7', NULL);
INSERT INTO "C##BOOKWORMS"."BOOKS" VALUES ('41', 'Harry Potter and the Deathly Hallows', 'Harry Potter #7

Harry Potter is leaving Privet Drive for the last time. But as he climbs into the sidecar of Hagrid’s motorbike and they take to the skies, he knows Lord Voldemort and the Death Eaters will not be far behind.

The protective charm that has kept him safe until now is broken. But the Dark Lord is breathing fear into everything he loves. And he knows he can’t keep hiding.

To stop Voldemort, Harry knows he must find the remaining Horcruxes and destroy them.

He will have to face his enemy in one final battle.

([source][1])


----------
See also:

 - [Harry Potter and the Deathly Hallows: 2/2][2]


  [1]: https://www.jkrowling.com/book/harry-potter-deathly-hallows/
  [2]: https://openlibrary.org/works/OL17922343W/Harry_Potter_and_the_Deathly_Hallows_Chapters_20-36', '3.6', '27', '99', '41.jpg');
INSERT INTO "C##BOOKWORMS"."BOOKS" VALUES ('42', 'Harry Potter and the Half-Blood Prince', 'Harry Potter #6

One summer night, when Dumbledore arrives at Privet Drive to collect Harry Potter, his wand hand is blackened and shriveled, but he will not reveal why.

Rumours and suspicion spread through the wizarding world – it feels as if even Hogwarts itself might be under threat.

Harry is convinced that Malfoy bears the Dark Mark: could there be a Death Eater amongst them?

He will need powerful magic and true friends as, with the help of Dumbledore, he investigates Voldemort’s darkest secrets.

([source][2])

Preceded by: [Harry Potter and the Order of the Phoenix][1]
Followed by: [Harry Potter and the Deathly Hallows][3]


  [1]: https://openlibrary.org/works/OL13716955W/Harry_Potter_and_the_Order_of_the_Phoenix
  [2]: https://www.jkrowling.com/book/harry-potter-half-blood-prince/
  [3]: https://openlibrary.org/works/OL82586W/Harry_Potter_and_the_Deathly_Hallows', '4.3', '27', '27', '42.jpg');
INSERT INTO "C##BOOKWORMS"."BOOKS" VALUES ('43', 'Harry Potter and the Prisoner of Azkaban', 'Harry Potter #3

For Harry Potter, it’s the start of another far-from-ordinary year at Hogwarts when the Knight Bus crashes through the darkness and comes to an abrupt halt in front of him.

It turns out that Sirius Black, mass-murderer and follower of Lord Voldemort, has escaped – and they say he is coming after Harry.

In his first Divination class, Professor Trelawney sees an omen of death in Harry’s tea leaves.

And perhaps most frightening of all are the Dementors patrolling the school grounds with their soul-sucking kiss – in search of fresh victims.

([source][1])


  [1]: https://www.jkrowling.com/book/harry-potter-prisoner-azkaban/', '4.2', '27', '47', '43.jpg');
INSERT INTO "C##BOOKWORMS"."BOOKS" VALUES ('44', 'Harry Potter and the Goblet of Fire', 'The fourth book in the Harry Potter franchise sees Harry returning for his fourth year at Hogwarts School of Witchcraft and Wizardry, along with his friends, Ron and Hermione . There is an upcoming tournament between the three major schools of magic, with one participant selected from each school by the Goblet of Fire. When Harry''s name is drawn, even though he is not eligible and is a fourth player, he must compete in the dangerous contest.


----------
Contains:

 - [Harry Potter and the Goblet of Fire. 2/4](https://openlibrary.org/works/OL17910198W/Harry_Potter_and_the_Goblet_of_Fire._2_4)', '4.3', '27', '52', '44.jpg');
INSERT INTO "C##BOOKWORMS"."BOOKS" VALUES ('45', 'Harry Potter and the Order of the Phoenix', 'Harry Potter #5

After the Dementors’ attack on his cousin Dudley, Harry knows he is about to become Voldemort’s next target.

Although many are denying the Dark Lord’s return, Harry is not alone, and a secret order is gathering at Grimmauld Place to fight against the Dark forces.

Meanwhile, Voldemort’s savage assaults on Harry’s mind are growing stronger every day.

He must allow Professor Snape to teach him to protect himself before he runs out of time.
([source][1])


----------
This work has also been published in multiple volumes. See:

 - [Harry Potter and the Order of the Phoenix: III](https://openlibrary.org/works/OL17937113W/Harry_Potter_and_the_Order_of_the_Phoenix_Chapters_17-23)
 - [Harry Potter and the Order of the Phoenix: IV](https://openlibrary.org/works/OL17915213W/Harry_Potter_and_the_Order_of_the_Phoenix_Chapters_24-30)

  [1]: https://www.jkrowling.com/book/harry-potter-order-phoenix/', '4.2', '26', '36', '45.jpg');
INSERT INTO "C##BOOKWORMS"."BOOKS" VALUES ('46', 'A Storm of Swords', 'Here is the third volume in George R. R. Martin''s magnificent cycle of novels that includes A Game of Thrones and A Clash of Kings. As a whole, this series comprises a genuine masterpiece of modern fantasy, bringing together the best the genre has to offer. Magic, mystery, intrigue, romance, and adventure fill these pages and transport us to a world unlike any we have ever experienced. 

Of the five contenders for power, one is dead, another in disfavor, and still the wars rage as violently as ever, as alliances are made and broken. Joffrey, of House Lannister, sits on the Iron Throne, the uneasy ruler of the land of the Seven Kingdoms. His most bitter rival, Lord Stannis, stands defeated and disgraced, the victim of the jealous sorceress who holds him in her evil thrall. But young Robb, of House Stark, still rules the North from the fortress of Riverrun. Robb plots against his despised Lannister enemies, even as they hold his sister hostage at King''s Landing, the seat of the Iron Throne. Meanwhile, making her way across a blood-drenched continent is the exiled queen, Daenerys, mistress of the only three dragons still left in the world....But as opposing forces maneuver for the final titanic showdown, an army of barbaric wildlings arrives from the outermost line of civilization. In their vanguard is a horde of mythical Others--a supernatural army of the living dead whose animated corpses are unstoppable. As the future of the land hangs in the balance, no one will rest until the Seven Kingdoms have exploded in a veritable storm of swords. *From the Paperback edition.*', '4.1', '21', '14', '46.jpg');
INSERT INTO "C##BOOKWORMS"."BOOKS" VALUES ('47', 'A Game of Thrones', 'A Game of Thrones is the first novel in A Song of Ice and Fire, a series of fantasy novels by the American author George R. R. Martin. It was first published on August 1, 1996. The novel won the 1997 Locus Award and was nominated for both the 1997 Nebula Award and the 1997 World Fantasy Award. The novella Blood of the Dragon, comprising the Daenerys Targaryen chapters from the novel, won the 1997 Hugo Award for Best Novella. In January 2011, the novel became a New York Times Bestseller and reached No. 1 on the list in July 2011.', '4.8', '21', '33', '47.jpg');
INSERT INTO "C##BOOKWORMS"."BOOKS" VALUES ('48', 'A Game of Thrones (2011)', 'A Game of Thrones is the first novel in A Song of Ice and Fire, a series of fantasy novels by the American author George R. R. Martin. It was first published on August 1, 1996. The novel won the 1997 Locus Award and was nominated for both the 1997 Nebula Award and the 1997 World Fantasy Award. The novella Blood of the Dragon, comprising the Daenerys Targaryen chapters from the novel, won the 1997 Hugo Award for Best Novella. In January 2011, the novel became a New York Times Bestseller and reached No. 1 on the list in July 2011.', '4.5', '25', '33', '48.jpg');
INSERT INTO "C##BOOKWORMS"."BOOKS" VALUES ('49', 'Fantastic Mr. Fox', 'The main character of Fantastic Mr. Fox is an extremely clever anthropomorphized fox named Mr. Fox. He lives with his wife and four little foxes. In order to feed his family, he steals food from the cruel, brutish farmers named Boggis, Bunce, and Bean every night.

Finally tired of being constantly outwitted by Mr. Fox, the farmers attempt to capture and kill him. The foxes escape in time by burrowing deep into the ground. The farmers decide to wait outside the hole for the foxes to emerge. Unable to leave the hole and steal food, Mr. Fox and his family begin to starve. Mr. Fox devises a plan to steal food from the farmers by tunneling into the ground and borrowing into the farmer''s houses.

Aided by a friendly Badger, the animals bring the stolen food back and Mrs. Fox prepares a great celebratory banquet attended by the other starving animals and their families. Mr. Fox invites all the animals to live with him underground and says that he will provide food for them daily thanks to his underground passages. All the animals live happily and safely, while the farmers remain waiting outside in vain for Mr. Fox to show up.', '3.6', '22', '46', '49.jpg');
INSERT INTO "C##BOOKWORMS"."BOOKS" VALUES ('50', 'The Fault in Our Stars', 'Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel''s story is about to be completely rewritten.
([source][1])


  [1]: http://www.johngreenbooks.com/the-fault-in-our-stars', '4.3', '23', '45', '50.jpg');
INSERT INTO "C##BOOKWORMS"."BOOKS" VALUES ('51', 'Looking for Alaska', 'Before. Miles “Pudge” Halter is done with his safe life at home. His whole life has been one big non-event, and his obsession with famous last words has only made him crave “the Great Perhaps” even more (Francois Rabelais, poet). He heads off to the sometimes crazy and anything-but-boring world of Culver Creek Boarding School, and his life becomes the opposite of safe. Because down the hall is Alaska Young. The gorgeous, clever, funny, sexy, self-destructive, screwed up, and utterly fascinating Alaska Young. She is an event unto herself. She pulls Pudge into her world, launches him into the Great Perhaps, and steals his heart. Then. . . . 
After. Nothing is ever the same', '3.4', '23', '7', '51.jpg');
INSERT INTO "C##BOOKWORMS"."BOOKS" VALUES ('52', 'A Thousand Splendid Suns', 'After 103 weeks on the New York Times bestseller list and with four million copies of The Kite Runner shipped, Khaled Hosseini returns with a beautiful, riveting, and haunting novel that confirms his place as one of the most important literary writers today.

Propelled by the same superb instinct for storytelling that made The Kite Runner a beloved classic, A Thousand Splendid Suns is at once an incredible chronicle of thirty years of Afghan history and a deeply moving story of family, friendship, faith, and the salvation to be found in love.

Born a generation apart and with very different ideas about love and family, Mariam and Laila are two women brought jarringly together by war, by loss and by fate. As they endure the ever escalating dangers around them—in their home as well as in the streets of Kabul—they come to form a bond that makes them both sisters and mother-daughter to each other, and that will ultimately alter the course not just of their own lives but of the next generation. With heart-wrenching power and suspense, Hosseini shows how a woman''s love for her family can move her to shocking and heroic acts of self-sacrifice, and that in the end it is love, or even the memory of love, that is often the key to survival.

A stunning accomplishment, A Thousand Splendid Suns is a haunting, heartbreaking, compelling story of an unforgiving time, an unlikely friendship, and an indestructible love.
([source][1])


  [1]: https://khaledhosseini.com/books/a-thousand-splendid-suns/', '4.4', '24', '33', '52.jpg');
INSERT INTO "C##BOOKWORMS"."BOOKS" VALUES ('53', 'The kite runner', 'Traces the unlikely friendship of a wealthy Afghan youth and a servant''s son in a tale that spans the final days of Afghanistan''s monarchy through the atrocities of the present day.', '4.4', '24', '1', '53.jpg');
INSERT INTO "C##BOOKWORMS"."BOOKS" VALUES ('54', 'And the mountains echoed', 'Presents a story inspired by human love, how people take care of one another, and how choices resonate through subsequent generations. Afghanistan, 1952. Abdullah and his sister Pari live with their father and step-mother in the small village of Shadbagh. Their father, Saboor, is constantly in search of work and they struggle together through poverty and brutal winters. To Adbullah, Pari, as beautiful and sweet-natured as the fairy for which she was named, is everything. What happens to them-and the large and small manners in which it echoes through the lives of so many other people-is proof of the moral complexity of life.

This story begins in 1952 Afghanistan with two motherless siblings and moves through complex relationships and generations to the United States, Paris, and Greece, weaving a story of commitment, love, honor, and sacrifice. The plot contains violence.', '3.9', '26', '14', '54.jpg');

-- ----------------------------
-- Table structure for BOOK_GENRE
-- ----------------------------
-- DROP TABLE "C##BOOKWORMS"."BOOK_GENRE";
CREATE TABLE "C##BOOKWORMS"."BOOK_GENRE" (
  "BOOK_ID" NUMBER(20,0) VISIBLE,
  "GENRE_ID" NUMBER(20,0) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of BOOK_GENRE
-- ----------------------------
INSERT INTO "C##BOOKWORMS"."BOOK_GENRE" VALUES ('21', '1');
INSERT INTO "C##BOOKWORMS"."BOOK_GENRE" VALUES ('22', '1');
INSERT INTO "C##BOOKWORMS"."BOOK_GENRE" VALUES ('1', '6');
INSERT INTO "C##BOOKWORMS"."BOOK_GENRE" VALUES ('2', '6');
INSERT INTO "C##BOOKWORMS"."BOOK_GENRE" VALUES ('3', '6');
INSERT INTO "C##BOOKWORMS"."BOOK_GENRE" VALUES ('5', '1');
INSERT INTO "C##BOOKWORMS"."BOOK_GENRE" VALUES ('41', '2');
INSERT INTO "C##BOOKWORMS"."BOOK_GENRE" VALUES ('42', '2');
INSERT INTO "C##BOOKWORMS"."BOOK_GENRE" VALUES ('43', '2');
INSERT INTO "C##BOOKWORMS"."BOOK_GENRE" VALUES ('44', '2');
INSERT INTO "C##BOOKWORMS"."BOOK_GENRE" VALUES ('45', '2');
INSERT INTO "C##BOOKWORMS"."BOOK_GENRE" VALUES ('43', '5');
INSERT INTO "C##BOOKWORMS"."BOOK_GENRE" VALUES ('44', '5');
INSERT INTO "C##BOOKWORMS"."BOOK_GENRE" VALUES ('46', '3');
INSERT INTO "C##BOOKWORMS"."BOOK_GENRE" VALUES ('47', '3');
INSERT INTO "C##BOOKWORMS"."BOOK_GENRE" VALUES ('48', '3');
INSERT INTO "C##BOOKWORMS"."BOOK_GENRE" VALUES ('49', '5');
INSERT INTO "C##BOOKWORMS"."BOOK_GENRE" VALUES ('50', '4');
INSERT INTO "C##BOOKWORMS"."BOOK_GENRE" VALUES ('51', '4');
INSERT INTO "C##BOOKWORMS"."BOOK_GENRE" VALUES ('52', '7');
INSERT INTO "C##BOOKWORMS"."BOOK_GENRE" VALUES ('53', '7');
INSERT INTO "C##BOOKWORMS"."BOOK_GENRE" VALUES ('54', '7');

-- ----------------------------
-- Table structure for COMMENTARY
-- ----------------------------
-- DROP TABLE "C##BOOKWORMS"."COMMENTARY";
CREATE TABLE "C##BOOKWORMS"."COMMENTARY" (
  "COMMENT_ID" NUMBER(20,0) VISIBLE NOT NULL,
  "COMMENT_BODY" VARCHAR2(500 BYTE) VISIBLE NOT NULL,
  "DATED" DATE VISIBLE DEFAULT SYSDATE,
  "WALLPOST_ID" NUMBER(20,0) VISIBLE,
  "READER_ID" NUMBER(20,0) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of COMMENTARY
-- ----------------------------

-- ----------------------------
-- Table structure for FOLLOWER_AUTHOR
-- ----------------------------
-- DROP TABLE "C##BOOKWORMS"."FOLLOWER_AUTHOR";
CREATE TABLE "C##BOOKWORMS"."FOLLOWER_AUTHOR" (
  "FOLLOWER_ID" NUMBER(20,0) VISIBLE NOT NULL,
  "AUTHOR_ID" NUMBER(20,0) VISIBLE NOT NULL,
  "DATED" DATE VISIBLE DEFAULT SYSDATE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of FOLLOWER_AUTHOR
-- ----------------------------
INSERT INTO "C##BOOKWORMS"."FOLLOWER_AUTHOR" VALUES ('3', '29', TO_DATE('2022-02-23 15:26:19', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."FOLLOWER_AUTHOR" VALUES ('22', '26', TO_DATE('2022-02-20 21:59:51', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."FOLLOWER_AUTHOR" VALUES ('22', '2', TO_DATE('2022-02-20 22:48:27', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."FOLLOWER_AUTHOR" VALUES ('25', '26', TO_DATE('2022-02-18 21:09:57', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."FOLLOWER_AUTHOR" VALUES ('25', '28', TO_DATE('2022-02-18 21:11:15', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."FOLLOWER_AUTHOR" VALUES ('22', '1', TO_DATE('2022-02-21 11:32:07', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."FOLLOWER_AUTHOR" VALUES ('22', '29', TO_DATE('2022-02-23 09:29:31', 'SYYYY-MM-DD HH24:MI:SS'));

-- ----------------------------
-- Table structure for FOLLOWER_READER
-- ----------------------------
-- DROP TABLE "C##BOOKWORMS"."FOLLOWER_READER";
CREATE TABLE "C##BOOKWORMS"."FOLLOWER_READER" (
  "FOLLOWER_ID" NUMBER(20,0) VISIBLE NOT NULL,
  "READER_ID" NUMBER(20,0) VISIBLE NOT NULL,
  "DATED" DATE VISIBLE DEFAULT SYSDATE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of FOLLOWER_READER
-- ----------------------------
INSERT INTO "C##BOOKWORMS"."FOLLOWER_READER" VALUES ('25', '1', TO_DATE('2022-02-18 21:12:13', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."FOLLOWER_READER" VALUES ('25', '22', TO_DATE('2022-02-18 21:02:48', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."FOLLOWER_READER" VALUES ('25', '2', TO_DATE('2022-02-18 21:12:04', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."FOLLOWER_READER" VALUES ('3', '22', TO_DATE('2022-02-23 15:27:39', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."FOLLOWER_READER" VALUES ('22', '2', TO_DATE('2022-02-20 18:16:52', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."FOLLOWER_READER" VALUES ('22', '1', TO_DATE('2022-02-20 19:03:58', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."FOLLOWER_READER" VALUES ('2', '22', TO_DATE('2022-02-20 20:02:11', 'SYYYY-MM-DD HH24:MI:SS'));

-- ----------------------------
-- Table structure for GENRE
-- ----------------------------
-- DROP TABLE "C##BOOKWORMS"."GENRE";
CREATE TABLE "C##BOOKWORMS"."GENRE" (
  "GENRE_ID" NUMBER(10,0) VISIBLE NOT NULL,
  "GENRE_NAME" VARCHAR2(30 BYTE) VISIBLE,
  "SUMMARY" VARCHAR2(2000 BYTE) VISIBLE,
  "PHOTO" VARCHAR2(50 BYTE) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of GENRE
-- ----------------------------
INSERT INTO "C##BOOKWORMS"."GENRE" VALUES ('1', 'Horror', 'Horror is a genre of literature, film, and television that is meant to scare, startle, shock, and even repulse audiences. The key focus of a horror novel, horror film, or horror TV show is to elicit a sense of dread in the reader through frightening images, themes, and situations.', '1.png');
INSERT INTO "C##BOOKWORMS"."GENRE" VALUES ('2', 'Fantasy', 'Fantasy is a genre of literature that features magical and supernatural elements that do not exist in the real world. Although some writers juxtapose a real-world setting with fantastical elements, many create entirely imaginary universes with their own physical laws and logic and populations of imaginary races and creatures. Speculative in nature, fantasy is not tied to reality or scientific fact.', '2.jpg');
INSERT INTO "C##BOOKWORMS"."GENRE" VALUES ('3', 'Thriller', 'Thrillers are dark, engrossing, and suspenseful plot-driven stories. They very seldom include comedic elements. Any novel can generate excitement, suspense, interest, and exhilaration, but because these are the primary goals of the thriller genre, thriller writers have laser-focused expertise in keeping a reader interested.', '3.jpg');
INSERT INTO "C##BOOKWORMS"."GENRE" VALUES ('4', 'Romance', 'A romance novel is a work of extended prose fiction with a theme of love. According to the Romance Writers of America, a romance novel must have a central focus on the development of a romantic relationship between two people. The other criteria for a romance novel is that it must have an emotional throughline and build to an optimistic conclusion.', '4.png');
INSERT INTO "C##BOOKWORMS"."GENRE" VALUES ('5', 'Children', 'The genre encompasses a wide range of works, including acknowledged classics of world literature, picture books and easy-to-read stories written exclusively for children, and fairy tales, lullabies, fables, folk songs, and other primarily orally transmitted materials or more specifically defined as fiction, non-fiction, poetry, or drama intended for and used by children and young people.', '5.jpg');
INSERT INTO "C##BOOKWORMS"."GENRE" VALUES ('6', 'Sci-Fi', 'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life.', '6.jpg');
INSERT INTO "C##BOOKWORMS"."GENRE" VALUES ('7', 'Historical-Fic', 'Historical fiction is a literary genre where the story takes place in the past. Historical novels capture the details of the time period as accurately as possible for authenticity, including social norms, manners, customs, and traditions.', '7.jpg');

-- ----------------------------
-- Table structure for PUBLISHER
-- ----------------------------
-- DROP TABLE "C##BOOKWORMS"."PUBLISHER";
CREATE TABLE "C##BOOKWORMS"."PUBLISHER" (
  "PUBLISHER_ID" NUMBER(20,0) VISIBLE NOT NULL,
  "NAME" VARCHAR2(40 BYTE) VISIBLE NOT NULL,
  "ADDRESS" VARCHAR2(50 BYTE) VISIBLE,
  "CONTACT" VARCHAR2(20 BYTE) VISIBLE,
  "EMAIL" VARCHAR2(40 BYTE) VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of PUBLISHER
-- ----------------------------
INSERT INTO "C##BOOKWORMS"."PUBLISHER" VALUES ('1', 'Devon Pubs', 'Berlin, Germany', '1-333-5678', 'dpubs@customersupport.co');
INSERT INTO "C##BOOKWORMS"."PUBLISHER" VALUES ('2', 'Houston House', 'California, USA', '1-800-767-1234', 'houhou@pubs.com');
INSERT INTO "C##BOOKWORMS"."PUBLISHER" VALUES ('21', 'Bantam Books', 'New York, United States', '1-800-733-3000', 'customersupport@penguinhouse.com');
INSERT INTO "C##BOOKWORMS"."PUBLISHER" VALUES ('24', 'Riverhead Books', 'New York, United States', '1-800-733-3000', ' newaccount@penguinhouse.com');
INSERT INTO "C##BOOKWORMS"."PUBLISHER" VALUES ('27', 'Scholastic', 'New York, United States', '1-800-724-6527', 'international@scholastic.com');
INSERT INTO "C##BOOKWORMS"."PUBLISHER" VALUES ('26', 'Bloomsbury Publishing', 'London, United Kingdom', '+44 (0)20 7631 5600', 'contact@bloomsbury.com');
INSERT INTO "C##BOOKWORMS"."PUBLISHER" VALUES ('22', 'Puffin Books', 'London, United Kingdom', '1-800-733-3000', 'puffinspublishers@gmail.com');
INSERT INTO "C##BOOKWORMS"."PUBLISHER" VALUES ('25', 'France Loisirs', 'Paris, France', '03-21-79-59-55', 'contact@leisure.com');
INSERT INTO "C##BOOKWORMS"."PUBLISHER" VALUES ('23', 'Dutton Books', 'New York, United States', '212-366-2792', 'Fax: (212) 302-7985');

-- ----------------------------
-- Table structure for QUOTES
-- ----------------------------
-- DROP TABLE "C##BOOKWORMS"."QUOTES";
CREATE TABLE "C##BOOKWORMS"."QUOTES" (
  "QUOTES_ID" NUMBER(20,0) VISIBLE NOT NULL,
  "TEXT_BODY" VARCHAR2(200 BYTE) VISIBLE NOT NULL,
  "BOOK_ID" NUMBER(20,0) VISIBLE,
  "CHARACTER" VARCHAR2(50 BYTE) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of QUOTES
-- ----------------------------
INSERT INTO "C##BOOKWORMS"."QUOTES" VALUES ('21', 'We are only as strong as we are united, as weak as we are divided.', '44', NULL);
INSERT INTO "C##BOOKWORMS"."QUOTES" VALUES ('1', 'Differences of habit and language are nothing at all if our aims are identical and our hearts are open.', '44', NULL);
INSERT INTO "C##BOOKWORMS"."QUOTES" VALUES ('2', 'It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.', NULL, NULL);
INSERT INTO "C##BOOKWORMS"."QUOTES" VALUES ('22', 'It does not do to dwell on dreams and forget to live.', NULL, 'Albus Dumbledore');
INSERT INTO "C##BOOKWORMS"."QUOTES" VALUES ('23', 'Sadly, accidental rudeness occurs alarmingly often. Best to say nothing at all, my dear man.', '42', NULL);
INSERT INTO "C##BOOKWORMS"."QUOTES" VALUES ('24', 'Age is foolish and forgetful when it underestimates youth.', '42', 'Albus Dumbledore');
INSERT INTO "C##BOOKWORMS"."QUOTES" VALUES ('25', 'Happiness can be found even in the darkest of times, if one only remembers to turn on the light.', '43', 'Albus Dumbledore');
INSERT INTO "C##BOOKWORMS"."QUOTES" VALUES ('26', 'We’ve all got both light and dark inside us. What matters is the part we choose to act on. That’s who we really are.', '45', 'Albus Dumbledore');
INSERT INTO "C##BOOKWORMS"."QUOTES" VALUES ('27', 'Words are, in my not-so-humble opinion, our most inexhaustible source of magic. Capable of both inflicting injury, and remedying it.', '41', 'Albus Dumbledore');

-- ----------------------------
-- Table structure for REACTION
-- ----------------------------
-- DROP TABLE "C##BOOKWORMS"."REACTION";
CREATE TABLE "C##BOOKWORMS"."REACTION" (
  "WALLPOST_ID" NUMBER(20,0) VISIBLE NOT NULL,
  "READER_ID" NUMBER(20,0) VISIBLE NOT NULL,
  "DATED" DATE VISIBLE DEFAULT SYSDATE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of REACTION
-- ----------------------------
INSERT INTO "C##BOOKWORMS"."REACTION" VALUES ('1', '22', TO_DATE('2022-02-23 02:26:18', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."REACTION" VALUES ('67', '22', TO_DATE('2022-02-24 22:27:48', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."REACTION" VALUES ('3', '22', TO_DATE('2022-02-22 16:17:32', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."REACTION" VALUES ('61', '25', TO_DATE('2022-02-22 16:13:37', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."REACTION" VALUES ('64', '22', TO_DATE('2022-02-23 15:01:07', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."REACTION" VALUES ('63', '3', TO_DATE('2022-02-23 13:09:46', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."REACTION" VALUES ('61', '22', TO_DATE('2022-02-23 12:35:48', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."REACTION" VALUES ('63', '22', TO_DATE('2022-02-23 12:35:54', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."REACTION" VALUES ('66', '3', TO_DATE('2022-02-23 13:09:12', 'SYYYY-MM-DD HH24:MI:SS'));

-- ----------------------------
-- Table structure for READER
-- ----------------------------
-- DROP TABLE "C##BOOKWORMS"."READER";
CREATE TABLE "C##BOOKWORMS"."READER" (
  "READER_ID" NUMBER(20,0) VISIBLE NOT NULL,
  "FIRST_NAME" VARCHAR2(25 BYTE) VISIBLE NOT NULL,
  "LAST_NAME" VARCHAR2(25 BYTE) VISIBLE NOT NULL,
  "BIO" VARCHAR2(50 BYTE) VISIBLE,
  "BORN" DATE VISIBLE NOT NULL,
  "FOLLOWER_COUNT" NUMBER(6,0) VISIBLE DEFAULT 0,
  "FOLLOWING_COUNT" NUMBER(6,0) VISIBLE DEFAULT 0,
  "EMAIL" VARCHAR2(30 BYTE) VISIBLE NOT NULL,
  "USERNAME" VARCHAR2(20 BYTE) VISIBLE NOT NULL,
  "PASSWORD" VARCHAR2(40 BYTE) VISIBLE NOT NULL,
  "PHOTO" VARCHAR2(50 BYTE) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of READER
-- ----------------------------
INSERT INTO "C##BOOKWORMS"."READER" VALUES ('25', 'Rownok', 'Ratul', 'Test bio 2', TO_DATE('1999-06-01 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '1', '3', 'rownokratul@gmail.com', 'Sparrow', '1234567', NULL);
INSERT INTO "C##BOOKWORMS"."READER" VALUES ('22', 'Tanjeem Azwad', 'Zaman', 'a Co-Founder', TO_DATE('1999-06-29 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '3', '3', 'azwadtanjeem@gmail.com', 'Inxtinct29', '1234567', '22.jpg');
INSERT INTO "C##BOOKWORMS"."READER" VALUES ('23', 'Jamal', 'Uddin', NULL, TO_DATE('2000-07-12 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '0', '0', 'Jamal@gmail.com', 'Jamal24', '123456', NULL);
INSERT INTO "C##BOOKWORMS"."READER" VALUES ('1', 'Hasan', 'Masum', 'Node JS Expert', TO_DATE('2022-01-25 23:36:31', 'SYYYY-MM-DD HH24:MI:SS'), '2', '0', 'hmasum@gmail.com', 'hMasum', '123123', NULL);
INSERT INTO "C##BOOKWORMS"."READER" VALUES ('2', 'Tamim', 'Ehsan', 'Master Programmer', TO_DATE('2022-01-26 23:36:34', 'SYYYY-MM-DD HH24:MI:SS'), '2', '1', 'tamimehsan@gmail.com', 'TamimEhsan', '123456', NULL);
INSERT INTO "C##BOOKWORMS"."READER" VALUES ('3', 'Sabbir', 'Abir', 'Friendly Senior', TO_DATE('2022-01-25 23:38:17', 'SYYYY-MM-DD HH24:MI:SS'), '0', '0', 'sabbirabir@gmail.com', 'Upobir', '123123', '3.jpg');
INSERT INTO "C##BOOKWORMS"."READER" VALUES ('43', 'farzin', 'zaman', NULL, TO_DATE('1999-06-29 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'), '0', '0', 'farzin@gmail.com', 'farzin', '1234567', NULL);

-- ----------------------------
-- Table structure for READER_GENRE
-- ----------------------------
-- DROP TABLE "C##BOOKWORMS"."READER_GENRE";
CREATE TABLE "C##BOOKWORMS"."READER_GENRE" (
  "READER_ID" NUMBER(20,0) VISIBLE,
  "GENRE_ID" NUMBER(20,0) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of READER_GENRE
-- ----------------------------
INSERT INTO "C##BOOKWORMS"."READER_GENRE" VALUES ('22', '5');
INSERT INTO "C##BOOKWORMS"."READER_GENRE" VALUES ('22', '6');
INSERT INTO "C##BOOKWORMS"."READER_GENRE" VALUES ('25', '4');
INSERT INTO "C##BOOKWORMS"."READER_GENRE" VALUES ('22', '2');
INSERT INTO "C##BOOKWORMS"."READER_GENRE" VALUES ('25', '2');
INSERT INTO "C##BOOKWORMS"."READER_GENRE" VALUES ('22', '3');

-- ----------------------------
-- Table structure for READ_STATUS
-- ----------------------------
-- DROP TABLE "C##BOOKWORMS"."READ_STATUS";
CREATE TABLE "C##BOOKWORMS"."READ_STATUS" (
  "READER_ID" NUMBER(20,0) VISIBLE NOT NULL,
  "BOOK_ID" NUMBER(20,0) VISIBLE NOT NULL,
  "STATUS" NUMBER(5,0) VISIBLE,
  "DATED" DATE VISIBLE DEFAULT SYSDATE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of READ_STATUS
-- ----------------------------
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('2', '1', '2', TO_DATE('2022-02-14 13:30:46', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('22', '21', '1', TO_DATE('2022-02-21 11:31:49', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('1', '2', '1', TO_DATE('2022-02-02 18:52:27', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('2', '3', '1', TO_DATE('2022-02-02 18:52:27', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('1', '1', '2', TO_DATE('2022-02-02 18:52:25', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('2', '2', '2', TO_DATE('2022-02-02 18:52:25', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('1', '5', '3', TO_DATE('2022-02-02 18:52:21', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('1', '3', '3', TO_DATE('2022-02-02 18:52:21', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('3', '5', '3', TO_DATE('2022-02-02 18:52:21', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('2', '21', '1', TO_DATE('2022-02-12 13:06:19', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('22', '41', '2', TO_DATE('2022-02-20 19:45:26', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('22', '43', '1', TO_DATE('2022-02-16 21:54:12', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('22', '49', '3', TO_DATE('2022-02-16 21:57:31', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('22', '50', '3', TO_DATE('2022-02-16 22:00:02', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('25', '43', '2', TO_DATE('2022-02-18 21:10:28', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('25', '51', '1', TO_DATE('2022-02-18 21:10:41', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('25', '54', '1', TO_DATE('2022-02-18 21:10:56', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('25', '52', '2', TO_DATE('2022-02-18 21:11:03', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('25', '53', '3', TO_DATE('2022-02-18 21:11:27', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('3', '51', '1', TO_DATE('2022-02-23 15:25:26', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('22', '2', '1', TO_DATE('2022-02-23 10:16:36', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('22', '1', '1', TO_DATE('2022-02-11 21:43:17', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('22', '51', '3', TO_DATE('2022-02-21 11:57:57', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('22', '47', '3', TO_DATE('2022-02-23 12:43:47', 'SYYYY-MM-DD HH24:MI:SS'));
INSERT INTO "C##BOOKWORMS"."READ_STATUS" VALUES ('22', '46', '3', TO_DATE('2022-02-23 12:44:24', 'SYYYY-MM-DD HH24:MI:SS'));

-- ----------------------------
-- Table structure for REVIEW
-- ----------------------------
-- DROP TABLE "C##BOOKWORMS"."REVIEW";
CREATE TABLE "C##BOOKWORMS"."REVIEW" (
  "REVIEW_ID" NUMBER(20,0) VISIBLE NOT NULL,
  "TEXT_BODY" VARCHAR2(2000 BYTE) VISIBLE NOT NULL,
  "DATED" DATE VISIBLE DEFAULT SYSDATE,
  "RATING" NUMBER(6,0) VISIBLE,
  "READER_ID" NUMBER(20,0) VISIBLE,
  "BOOK_ID" NUMBER(20,0) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of REVIEW
-- ----------------------------
INSERT INTO "C##BOOKWORMS"."REVIEW" VALUES ('43', 'Best of the bunch', TO_DATE('2022-02-23 00:23:15', 'SYYYY-MM-DD HH24:MI:SS'), '5', '22', '44');
INSERT INTO "C##BOOKWORMS"."REVIEW" VALUES ('45', 'Surprisingly..... Mediocre', TO_DATE('2022-02-23 00:24:33', 'SYYYY-MM-DD HH24:MI:SS'), '3', '22', '21');
INSERT INTO "C##BOOKWORMS"."REVIEW" VALUES ('61', 'magical', TO_DATE('2022-02-24 22:34:08', 'SYYYY-MM-DD HH24:MI:SS'), '5', '22', '43');
INSERT INTO "C##BOOKWORMS"."REVIEW" VALUES ('59', 'Shocking Twist at the end :(', TO_DATE('2022-02-23 15:09:08', 'SYYYY-MM-DD HH24:MI:SS'), '5', '22', '42');
INSERT INTO "C##BOOKWORMS"."REVIEW" VALUES ('50', 'A nice link in the chain', TO_DATE('2022-02-23 12:56:54', 'SYYYY-MM-DD HH24:MI:SS'), '5', '22', '45');
INSERT INTO "C##BOOKWORMS"."REVIEW" VALUES ('48', 'lacks depth', TO_DATE('2022-02-23 10:22:29', 'SYYYY-MM-DD HH24:MI:SS'), '2', '22', '2');
INSERT INTO "C##BOOKWORMS"."REVIEW" VALUES ('52', 'Not a big fan :(', TO_DATE('2022-02-23 13:13:51', 'SYYYY-MM-DD HH24:MI:SS'), '2', '25', '51');
INSERT INTO "C##BOOKWORMS"."REVIEW" VALUES ('51', 'Not as good as the others', TO_DATE('2022-02-23 12:59:02', 'SYYYY-MM-DD HH24:MI:SS'), '3', '3', '45');
INSERT INTO "C##BOOKWORMS"."REVIEW" VALUES ('57', 'Very wholesome. makes me want to explore the  beauty of alaska myself', TO_DATE('2022-02-23 13:20:54', 'SYYYY-MM-DD HH24:MI:SS'), '5', '2', '51');

-- ----------------------------
-- Table structure for WALLPOST
-- ----------------------------
-- DROP TABLE "C##BOOKWORMS"."WALLPOST";
CREATE TABLE "C##BOOKWORMS"."WALLPOST" (
  "WALLPOST_ID" NUMBER(20,0) VISIBLE NOT NULL,
  "DATED" DATE VISIBLE DEFAULT SYSDATE,
  "POST_BODY" VARCHAR2(500 BYTE) VISIBLE NOT NULL,
  "LIKE_COUNT" NUMBER(6,0) VISIBLE DEFAULT 0,
  "POSTED_BY_ID" NUMBER(20,0) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of WALLPOST
-- ----------------------------
INSERT INTO "C##BOOKWORMS"."WALLPOST" VALUES ('67', TO_DATE('2022-02-24 22:27:35', 'SYYYY-MM-DD HH24:MI:SS'), 'Hello World', '0', '22');
INSERT INTO "C##BOOKWORMS"."WALLPOST" VALUES ('1', TO_DATE('2022-02-18 00:37:19', 'SYYYY-MM-DD HH24:MI:SS'), 'My first Post', '0', '22');
INSERT INTO "C##BOOKWORMS"."WALLPOST" VALUES ('3', TO_DATE('2022-02-18 21:35:11', 'SYYYY-MM-DD HH24:MI:SS'), 'Just followed an author and readers', '0', '22');
INSERT INTO "C##BOOKWORMS"."WALLPOST" VALUES ('61', TO_DATE('2022-02-22 16:13:35', 'SYYYY-MM-DD HH24:MI:SS'), 'RATULS DUMMY POST', '0', '25');
INSERT INTO "C##BOOKWORMS"."WALLPOST" VALUES ('63', TO_DATE('2022-02-23 12:35:43', 'SYYYY-MM-DD HH24:MI:SS'), 'finished genre relations', '0', '22');
INSERT INTO "C##BOOKWORMS"."WALLPOST" VALUES ('64', TO_DATE('2022-02-23 12:39:22', 'SYYYY-MM-DD HH24:MI:SS'), 'This is a dummy post', '0', '22');
INSERT INTO "C##BOOKWORMS"."WALLPOST" VALUES ('65', TO_DATE('2022-02-23 12:58:41', 'SYYYY-MM-DD HH24:MI:SS'), 'Hello WOrld!', '0', '3');
INSERT INTO "C##BOOKWORMS"."WALLPOST" VALUES ('66', TO_DATE('2022-02-23 13:03:03', 'SYYYY-MM-DD HH24:MI:SS'), 'What a wonderful day!', '0', '3');

-- ----------------------------
-- Table structure for WRITTEN_BY
-- ----------------------------
-- DROP TABLE "C##BOOKWORMS"."WRITTEN_BY";
CREATE TABLE "C##BOOKWORMS"."WRITTEN_BY" (
  "BOOK_ID" NUMBER(20,0) VISIBLE NOT NULL,
  "AUTHOR_ID" NUMBER(20,0) VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of WRITTEN_BY
-- ----------------------------
INSERT INTO "C##BOOKWORMS"."WRITTEN_BY" VALUES ('1', '2');
INSERT INTO "C##BOOKWORMS"."WRITTEN_BY" VALUES ('2', '1');
INSERT INTO "C##BOOKWORMS"."WRITTEN_BY" VALUES ('3', '2');
INSERT INTO "C##BOOKWORMS"."WRITTEN_BY" VALUES ('5', '1');
INSERT INTO "C##BOOKWORMS"."WRITTEN_BY" VALUES ('21', '1');
INSERT INTO "C##BOOKWORMS"."WRITTEN_BY" VALUES ('22', '2');
INSERT INTO "C##BOOKWORMS"."WRITTEN_BY" VALUES ('41', '26');
INSERT INTO "C##BOOKWORMS"."WRITTEN_BY" VALUES ('42', '26');
INSERT INTO "C##BOOKWORMS"."WRITTEN_BY" VALUES ('43', '26');
INSERT INTO "C##BOOKWORMS"."WRITTEN_BY" VALUES ('44', '26');
INSERT INTO "C##BOOKWORMS"."WRITTEN_BY" VALUES ('45', '26');
INSERT INTO "C##BOOKWORMS"."WRITTEN_BY" VALUES ('46', '27');
INSERT INTO "C##BOOKWORMS"."WRITTEN_BY" VALUES ('47', '27');
INSERT INTO "C##BOOKWORMS"."WRITTEN_BY" VALUES ('48', '27');
INSERT INTO "C##BOOKWORMS"."WRITTEN_BY" VALUES ('49', '25');
INSERT INTO "C##BOOKWORMS"."WRITTEN_BY" VALUES ('50', '29');
INSERT INTO "C##BOOKWORMS"."WRITTEN_BY" VALUES ('51', '29');
INSERT INTO "C##BOOKWORMS"."WRITTEN_BY" VALUES ('52', '28');
INSERT INTO "C##BOOKWORMS"."WRITTEN_BY" VALUES ('53', '28');
INSERT INTO "C##BOOKWORMS"."WRITTEN_BY" VALUES ('54', '28');

-- ----------------------------
-- Function structure for EMAIL_FREE
-- ----------------------------
CREATE OR REPLACE
FUNCTION "C##BOOKWORMS"."EMAIL_FREE" AS
BEGIN
		--DBMS_OUTPUT.PUT_LINE(em);
		IF (id = 1) THEN --for reader
		SELECT count(*) INTO emailused from READER R WHERE R.EMAIL = em;
				IF emailused > 0 THEN
						--DBMS_OUTPUT.PUT_LINE(emailused);
						return FALSE;
				ELSE
						return TRUE;
				END IF;
				
		ELSE-- For author 
		SELECT count(*) INTO emailused from Author A WHERE A.EMAIL = em;
				IF emailused > 0 THEN
						--DBMS_OUTPUT.PUT_LINE(emailused);
						return FALSE;
				ELSE
						return TRUE;
				END IF;
		END IF;
END;
/

-- ----------------------------
-- Function structure for SEARCH_BY_
-- ----------------------------
CREATE OR REPLACE
PROCEDURE "C##BOOKWORMS"."SEARCH_BY_" AS
BEGIN
			Select * from BOOKS b
			where b.TITLE like '%' || bname || '%';
END;
/

-- ----------------------------
-- Function structure for TIMEDIFF
-- ----------------------------
CREATE OR REPLACE FUNCTION TIMEDIFF (D IN DATE)
RETURN VARCHAR2 IS
            days NUMBER ;
            secs NUMBER;
            msg VARCHAR2(50);
BEGIN
            days := SYSDATE - D;
            secs := ROUND(days * 24 * 60 * 60);
            DBMS_OUTPUT.PUT_LINE(secs);
            IF (secs < 60) THEN
                    msg := TO_CHAR(secs) || ' seconds';
            ELSIF (secs < 60 * 60) THEN
                    msg := TO_CHAR(ROUND(secs/60)) || ' minutes';
            ELSIF (secs < 60 * 60 * 24) THEN
                    msg := TO_CHAR(ROUND(secs/(60 * 60))) || ' hours';
            ELSIF (secs < 60 * 60 * 24 * 30) THEN
                    msg := TO_CHAR(ROUND(secs/(60 * 60 * 24))) || ' days';
            ELSE
                    msg := TO_CHAR(ROUND(secs/(60 * 60 * 24 * 30))) || ' months';
            END IF;
            RETURN TO_CHAR(msg);
END;
/

-- ----------------------------
-- Sequence structure for AUTHOR_SEQUENCE
-- ----------------------------
DROP SEQUENCE "C##BOOKWORMS"."AUTHOR_SEQUENCE";
CREATE SEQUENCE "C##BOOKWORMS"."AUTHOR_SEQUENCE" START WITH 100 MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for BOOK_SEQUENCE
-- ----------------------------
DROP SEQUENCE "C##BOOKWORMS"."BOOK_SEQUENCE";
CREATE SEQUENCE "C##BOOKWORMS"."BOOK_SEQUENCE" START WITH 100 MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for COMMENT_SEQUENCE
-- ----------------------------
DROP SEQUENCE "C##BOOKWORMS"."COMMENT_SEQUENCE";
CREATE SEQUENCE "C##BOOKWORMS"."COMMENT_SEQUENCE" START WITH 100 MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for GENRE_SEQUENCE
-- ----------------------------
DROP SEQUENCE "C##BOOKWORMS"."GENRE_SEQUENCE";
CREATE SEQUENCE "C##BOOKWORMS"."GENRE_SEQUENCE" START WITH 100 MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for PUBLISHER_SEQUENCE
-- ----------------------------
DROP SEQUENCE "C##BOOKWORMS"."PUBLISHER_SEQUENCE";
CREATE SEQUENCE "C##BOOKWORMS"."PUBLISHER_SEQUENCE" START WITH 100 MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for QUOTE_SEQUENCE
-- ----------------------------
DROP SEQUENCE "C##BOOKWORMS"."QUOTE_SEQUENCE";
CREATE SEQUENCE "C##BOOKWORMS"."QUOTE_SEQUENCE" START WITH 100 MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for READER_SEQUENCE
-- ----------------------------
DROP SEQUENCE "C##BOOKWORMS"."READER_SEQUENCE";
CREATE SEQUENCE "C##BOOKWORMS"."READER_SEQUENCE" START WITH 100 MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for REVIEW_SEQUENCE
-- ----------------------------
DROP SEQUENCE "C##BOOKWORMS"."REVIEW_SEQUENCE";
CREATE SEQUENCE "C##BOOKWORMS"."REVIEW_SEQUENCE" START WITH 100 MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for WALLPOST_SEQUENCE
-- ----------------------------
DROP SEQUENCE "C##BOOKWORMS"."WALLPOST_SEQUENCE";
CREATE SEQUENCE "C##BOOKWORMS"."WALLPOST_SEQUENCE" START WITH 100 MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Primary Key structure for table AUTHOR
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."AUTHOR" ADD CONSTRAINT "AUTHOR_PK" PRIMARY KEY ("AUTHOR_ID");

-- ----------------------------
-- Uniques structure for table AUTHOR
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."AUTHOR" ADD CONSTRAINT "SYS_C008124" UNIQUE ("EMAIL") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Checks structure for table AUTHOR
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."AUTHOR" ADD CONSTRAINT "SYS_C008116" CHECK ("FIRST_NAME" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##BOOKWORMS"."AUTHOR" ADD CONSTRAINT "SYS_C008117" CHECK ("LAST_NAME" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##BOOKWORMS"."AUTHOR" ADD CONSTRAINT "SYS_C008118" CHECK ("BORN" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##BOOKWORMS"."AUTHOR" ADD CONSTRAINT "SYS_C008120" CHECK ("EMAIL" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Triggers structure for table AUTHOR
-- ----------------------------
CREATE TRIGGER "C##BOOKWORMS"."AUTHOR_ON_INSERT" BEFORE INSERT ON "C##BOOKWORMS"."AUTHOR" REFERENCING OLD AS "OLD" NEW AS "NEW" FOR EACH ROW 
BEGIN
  SELECT author_sequence.nextval
  INTO :new.author_id
  FROM dual;
END;
/
CREATE TRIGGER "C##BOOKWORMS"."CASCADE_DELETE_AUTHOR" BEFORE DELETE ON "C##BOOKWORMS"."AUTHOR" REFERENCING OLD AS "OLD" NEW AS "NEW" FOR EACH ROW 
DECLARE 
		
BEGIN 
		
		DELETE FROM FOLLOWER_AUTHOR
		WHERE AUTHOR_ID = :OLD.AUTHOR_ID;
		
		DELETE FROM BOOKS
		WHERE BOOK_ID IN (SELECT BOOK_ID FROM WRITTEN_BY WHERE AUTHOR_ID = :OLD.AUTHOR_ID);
		
		DELETE FROM WRITTEN_BY
		WHERE AUTHOR_ID = :OLD.AUTHOR_ID;
		
		DELETE FROM AUTHOR_GENRE
		WHERE AUTHOR_ID = :OLD.AUTHOR_ID;
			
END;
/

-- ----------------------------
-- Primary Key structure for table BOOKS
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."BOOKS" ADD CONSTRAINT "SYS_C008126" PRIMARY KEY ("BOOK_ID");

-- ----------------------------
-- Checks structure for table BOOKS
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."BOOKS" ADD CONSTRAINT "SYS_C008125" CHECK ("TITLE" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##BOOKWORMS"."BOOKS" ADD CONSTRAINT "SYS_C008416" CHECK ("PUBLISHER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Triggers structure for table BOOKS
-- ----------------------------
CREATE TRIGGER "C##BOOKWORMS"."BOOKS_ON_INSERT" BEFORE INSERT ON "C##BOOKWORMS"."BOOKS" REFERENCING OLD AS "OLD" NEW AS "NEW" FOR EACH ROW 
BEGIN
  SELECT book_sequence.nextval
  INTO :new.book_id
  FROM dual;
END;
/
CREATE TRIGGER "C##BOOKWORMS"."CASCADE_DELETE_BOOK" BEFORE DELETE ON "C##BOOKWORMS"."BOOKS" REFERENCING OLD AS "OLD" NEW AS "NEW" FOR EACH ROW 
DECLARE 
		
BEGIN 
		
		
		DELETE FROM READ_STATUS
		WHERE BOOK_ID = :OLD.BOOK_ID;
		
		DELETE FROM REVIEW
		WHERE BOOK_ID = :OLD.BOOK_ID;
		
		DELETE FROM WRITTEN_BY
		WHERE BOOK_ID = :OLD.BOOK_ID;
		
		DELETE FROM BOOK_GENRE
		WHERE BOOK_ID = :OLD.BOOK_ID;
			
END;
/

-- ----------------------------
-- Primary Key structure for table COMMENTARY
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."COMMENTARY" ADD CONSTRAINT "SYS_C008145" PRIMARY KEY ("COMMENT_ID");

-- ----------------------------
-- Checks structure for table COMMENTARY
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."COMMENTARY" ADD CONSTRAINT "SYS_C008144" CHECK ("COMMENT_BODY" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Triggers structure for table COMMENTARY
-- ----------------------------
CREATE TRIGGER "C##BOOKWORMS"."COMMENT_ON_INSERT" BEFORE INSERT ON "C##BOOKWORMS"."COMMENTARY" REFERENCING OLD AS "OLD" NEW AS "NEW" FOR EACH ROW 
BEGIN
  SELECT comment_sequence.nextval
  INTO :new.COMMENT_ID
  FROM dual;
END;
/

-- ----------------------------
-- Primary Key structure for table FOLLOWER_AUTHOR
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."FOLLOWER_AUTHOR" ADD CONSTRAINT "SYS_C008150" PRIMARY KEY ("FOLLOWER_ID", "AUTHOR_ID");

-- ----------------------------
-- Primary Key structure for table FOLLOWER_READER
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."FOLLOWER_READER" ADD CONSTRAINT "SYS_C008153" PRIMARY KEY ("FOLLOWER_ID", "READER_ID");

-- ----------------------------
-- Primary Key structure for table GENRE
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."GENRE" ADD CONSTRAINT "SYS_C008231" PRIMARY KEY ("GENRE_ID");

-- ----------------------------
-- Triggers structure for table GENRE
-- ----------------------------
CREATE TRIGGER "C##BOOKWORMS"."CASCADE_DELETE_GENRE" BEFORE DELETE ON "C##BOOKWORMS"."GENRE" REFERENCING OLD AS "OLD" NEW AS "NEW" FOR EACH ROW 
DECLARE 
		
BEGIN 
		
		DELETE FROM BOOK_GENRE
		WHERE GENRE_ID = :OLD.GENRE_ID;
		
		DELETE FROM AUTHOR_GENRE
		WHERE GENRE_ID = :OLD.GENRE_ID;
		
		DELETE FROM READER_GENRE
		WHERE GENRE_ID = :OLD.GENRE_ID;
		
END;
/
CREATE TRIGGER "C##BOOKWORMS"."GENRE_ON_INSERT" BEFORE INSERT ON "C##BOOKWORMS"."GENRE" REFERENCING OLD AS "OLD" NEW AS "NEW" FOR EACH ROW 
BEGIN
  SELECT genre_sequence.nextval
  INTO :new.genre_id
  FROM dual;
END;
/

-- ----------------------------
-- Primary Key structure for table PUBLISHER
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."PUBLISHER" ADD CONSTRAINT "SYS_C008115" PRIMARY KEY ("PUBLISHER_ID");

-- ----------------------------
-- Checks structure for table PUBLISHER
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."PUBLISHER" ADD CONSTRAINT "SYS_C008113" CHECK ("NAME" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##BOOKWORMS"."PUBLISHER" ADD CONSTRAINT "SYS_C008114" CHECK ("EMAIL" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Triggers structure for table PUBLISHER
-- ----------------------------
CREATE TRIGGER "C##BOOKWORMS"."CASCADE_DELETE_PUBLISHER" BEFORE DELETE ON "C##BOOKWORMS"."PUBLISHER" REFERENCING OLD AS "OLD" NEW AS "NEW" FOR EACH ROW 
DECLARE 
		
BEGIN 
		
		DELETE FROM BOOKS
		WHERE PUBLISHER_ID = :OLD.PUBLISHER_ID;
		
END;
/
CREATE TRIGGER "C##BOOKWORMS"."PUBLISHER_ON_INSERT" BEFORE INSERT ON "C##BOOKWORMS"."PUBLISHER" REFERENCING OLD AS "OLD" NEW AS "NEW" FOR EACH ROW 
BEGIN
  SELECT publisher_sequence.nextval
  INTO :new.publisher_id
  FROM dual;
END;
/

-- ----------------------------
-- Primary Key structure for table QUOTES
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."QUOTES" ADD CONSTRAINT "QUOTE_PK" PRIMARY KEY ("QUOTES_ID");

-- ----------------------------
-- Checks structure for table QUOTES
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."QUOTES" ADD CONSTRAINT "SYS_C008171" CHECK ("TEXT_BODY" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Triggers structure for table QUOTES
-- ----------------------------
CREATE TRIGGER "C##BOOKWORMS"."QUOTES_ON_INSERT" BEFORE INSERT ON "C##BOOKWORMS"."QUOTES" REFERENCING OLD AS "OLD" NEW AS "NEW" FOR EACH ROW 
BEGIN
  SELECT quote_sequence.nextval
  INTO :new.quotes_id
  FROM dual;
END;
/

-- ----------------------------
-- Primary Key structure for table REACTION
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."REACTION" ADD CONSTRAINT "SYS_C008162" PRIMARY KEY ("WALLPOST_ID", "READER_ID");

-- ----------------------------
-- Primary Key structure for table READER
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."READER" ADD CONSTRAINT "SYS_C008135" PRIMARY KEY ("READER_ID");

-- ----------------------------
-- Uniques structure for table READER
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."READER" ADD CONSTRAINT "SYS_C008136" UNIQUE ("EMAIL") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Checks structure for table READER
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."READER" ADD CONSTRAINT "SYS_C008128" CHECK ("FIRST_NAME" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##BOOKWORMS"."READER" ADD CONSTRAINT "SYS_C008129" CHECK ("LAST_NAME" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##BOOKWORMS"."READER" ADD CONSTRAINT "SYS_C008130" CHECK ("BORN" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##BOOKWORMS"."READER" ADD CONSTRAINT "SYS_C008132" CHECK ("EMAIL" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##BOOKWORMS"."READER" ADD CONSTRAINT "SYS_C008133" CHECK ("USERNAME" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##BOOKWORMS"."READER" ADD CONSTRAINT "SYS_C008134" CHECK ("PASSWORD" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Triggers structure for table READER
-- ----------------------------
CREATE TRIGGER "C##BOOKWORMS"."CASCADE_DELETE_READER" BEFORE DELETE ON "C##BOOKWORMS"."READER" REFERENCING OLD AS "OLD" NEW AS "NEW" FOR EACH ROW 
DECLARE 
		
BEGIN 
		
		DELETE FROM FOLLOWER_READER
		WHERE READER_ID = :OLD.READER_ID OR FOLLOWER_ID = :OLD.READER_ID;
		
		DELETE FROM FOLLOWER_AUTHOR
		WHERE FOLLOWER_ID = :OLD.READER_ID;
		
		DELETE FROM READ_STATUS
		WHERE READER_ID = :OLD.READER_ID;
		
		DELETE FROM WALLPOST
		WHERE POSTED_BY_ID = :OLD.READER_ID;
		
		DELETE FROM REVIEW
		WHERE READER_ID = :OLD.READER_ID;
		
		DELETE FROM REACTION
		WHERE READER_ID = :OLD.READER_ID;
		
		DELETE FROM READER_GENRE
		WHERE READER_ID = :OLD.READER_ID;
			
END;
/
CREATE TRIGGER "C##BOOKWORMS"."READER_ON_INSERT" BEFORE INSERT ON "C##BOOKWORMS"."READER" REFERENCING OLD AS "OLD" NEW AS "NEW" FOR EACH ROW 
BEGIN
  SELECT reader_sequence.nextval
  INTO :new.reader_id
  FROM dual;
END;
/

-- ----------------------------
-- Primary Key structure for table READ_STATUS
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."READ_STATUS" ADD CONSTRAINT "SYS_C008298" PRIMARY KEY ("READER_ID", "BOOK_ID");

-- ----------------------------
-- Primary Key structure for table REVIEW
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."REVIEW" ADD CONSTRAINT "SYS_C008138" PRIMARY KEY ("REVIEW_ID");

-- ----------------------------
-- Checks structure for table REVIEW
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."REVIEW" ADD CONSTRAINT "SYS_C008137" CHECK ("TEXT_BODY" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Triggers structure for table REVIEW
-- ----------------------------
CREATE TRIGGER "C##BOOKWORMS"."REVIEW_ON_INSERT" BEFORE INSERT ON "C##BOOKWORMS"."REVIEW" REFERENCING OLD AS "OLD" NEW AS "NEW" FOR EACH ROW 
BEGIN
  SELECT review_sequence.nextval
  INTO :new.review_id
  FROM dual;
END;
/

-- ----------------------------
-- Primary Key structure for table WALLPOST
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."WALLPOST" ADD CONSTRAINT "SYS_C008142" PRIMARY KEY ("WALLPOST_ID");

-- ----------------------------
-- Checks structure for table WALLPOST
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."WALLPOST" ADD CONSTRAINT "SYS_C008141" CHECK ("POST_BODY" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Triggers structure for table WALLPOST
-- ----------------------------
CREATE TRIGGER "C##BOOKWORMS"."CASCADE_DELETE_WALLPOST" BEFORE DELETE ON "C##BOOKWORMS"."WALLPOST" REFERENCING OLD AS "OLD" NEW AS "NEW" FOR EACH ROW 
DECLARE 
BEGIN 
		DELETE FROM REACTION
		WHERE WALLPOST_ID = :OLD.WALLPOST_ID;
			
END;
/
CREATE TRIGGER "C##BOOKWORMS"."WALLPOST_TRIGGER" BEFORE INSERT ON "C##BOOKWORMS"."WALLPOST" REFERENCING OLD AS "OLD" NEW AS "NEW" FOR EACH ROW 
BEGIN 
	SELECT WALLPOST_SEQUENCE.NEXTVAL
	INTO :NEW.WALLPOST_ID
	FROM DUAL;
END;
/

-- ----------------------------
-- Primary Key structure for table WRITTEN_BY
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."WRITTEN_BY" ADD CONSTRAINT "SYS_C008168" PRIMARY KEY ("BOOK_ID", "AUTHOR_ID");

-- ----------------------------
-- Foreign Keys structure for table AUTHOR_GENRE
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."AUTHOR_GENRE" ADD CONSTRAINT "SYS_C008236" FOREIGN KEY ("AUTHOR_ID") REFERENCES "C##BOOKWORMS"."AUTHOR" ("AUTHOR_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##BOOKWORMS"."AUTHOR_GENRE" ADD CONSTRAINT "SYS_C008237" FOREIGN KEY ("GENRE_ID") REFERENCES "C##BOOKWORMS"."GENRE" ("GENRE_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table BOOKS
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."BOOKS" ADD CONSTRAINT "SYS_C008127" FOREIGN KEY ("PUBLISHER_ID") REFERENCES "C##BOOKWORMS"."PUBLISHER" ("PUBLISHER_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table BOOK_GENRE
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."BOOK_GENRE" ADD CONSTRAINT "SYS_C008234" FOREIGN KEY ("BOOK_ID") REFERENCES "C##BOOKWORMS"."BOOKS" ("BOOK_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##BOOKWORMS"."BOOK_GENRE" ADD CONSTRAINT "SYS_C008235" FOREIGN KEY ("GENRE_ID") REFERENCES "C##BOOKWORMS"."GENRE" ("GENRE_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table COMMENTARY
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."COMMENTARY" ADD CONSTRAINT "SYS_C008146" FOREIGN KEY ("WALLPOST_ID") REFERENCES "C##BOOKWORMS"."WALLPOST" ("WALLPOST_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##BOOKWORMS"."COMMENTARY" ADD CONSTRAINT "SYS_C008147" FOREIGN KEY ("READER_ID") REFERENCES "C##BOOKWORMS"."READER" ("READER_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table FOLLOWER_AUTHOR
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."FOLLOWER_AUTHOR" ADD CONSTRAINT "SYS_C008151" FOREIGN KEY ("AUTHOR_ID") REFERENCES "C##BOOKWORMS"."AUTHOR" ("AUTHOR_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##BOOKWORMS"."FOLLOWER_AUTHOR" ADD CONSTRAINT "SYS_C008152" FOREIGN KEY ("FOLLOWER_ID") REFERENCES "C##BOOKWORMS"."READER" ("READER_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table FOLLOWER_READER
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."FOLLOWER_READER" ADD CONSTRAINT "SYS_C008154" FOREIGN KEY ("READER_ID") REFERENCES "C##BOOKWORMS"."READER" ("READER_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##BOOKWORMS"."FOLLOWER_READER" ADD CONSTRAINT "SYS_C008155" FOREIGN KEY ("FOLLOWER_ID") REFERENCES "C##BOOKWORMS"."READER" ("READER_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table QUOTES
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."QUOTES" ADD CONSTRAINT "SYS_C008405" FOREIGN KEY ("BOOK_ID") REFERENCES "C##BOOKWORMS"."BOOKS" ("BOOK_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table REACTION
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."REACTION" ADD CONSTRAINT "REACTION_READER_FK" FOREIGN KEY ("READER_ID") REFERENCES "C##BOOKWORMS"."READER" ("READER_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##BOOKWORMS"."REACTION" ADD CONSTRAINT "REACTION_WALLPOST_FK" FOREIGN KEY ("WALLPOST_ID") REFERENCES "C##BOOKWORMS"."WALLPOST" ("WALLPOST_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table READER_GENRE
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."READER_GENRE" ADD CONSTRAINT "SYS_C008232" FOREIGN KEY ("READER_ID") REFERENCES "C##BOOKWORMS"."READER" ("READER_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##BOOKWORMS"."READER_GENRE" ADD CONSTRAINT "SYS_C008233" FOREIGN KEY ("GENRE_ID") REFERENCES "C##BOOKWORMS"."GENRE" ("GENRE_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table READ_STATUS
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."READ_STATUS" ADD CONSTRAINT "SYS_C008299" FOREIGN KEY ("READER_ID") REFERENCES "C##BOOKWORMS"."READER" ("READER_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##BOOKWORMS"."READ_STATUS" ADD CONSTRAINT "SYS_C008300" FOREIGN KEY ("BOOK_ID") REFERENCES "C##BOOKWORMS"."BOOKS" ("BOOK_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table REVIEW
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."REVIEW" ADD CONSTRAINT "SYS_C008139" FOREIGN KEY ("READER_ID") REFERENCES "C##BOOKWORMS"."READER" ("READER_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##BOOKWORMS"."REVIEW" ADD CONSTRAINT "SYS_C008140" FOREIGN KEY ("BOOK_ID") REFERENCES "C##BOOKWORMS"."BOOKS" ("BOOK_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table WALLPOST
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."WALLPOST" ADD CONSTRAINT "SYS_C008143" FOREIGN KEY ("POSTED_BY_ID") REFERENCES "C##BOOKWORMS"."READER" ("READER_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table WRITTEN_BY
-- ----------------------------
ALTER TABLE "C##BOOKWORMS"."WRITTEN_BY" ADD CONSTRAINT "SYS_C008169" FOREIGN KEY ("AUTHOR_ID") REFERENCES "C##BOOKWORMS"."AUTHOR" ("AUTHOR_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "C##BOOKWORMS"."WRITTEN_BY" ADD CONSTRAINT "SYS_C008170" FOREIGN KEY ("BOOK_ID") REFERENCES "C##BOOKWORMS"."BOOKS" ("BOOK_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
