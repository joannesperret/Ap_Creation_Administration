--
-- Base de données :  `ecf`
--
CREATE DATABASE IF NOT EXISTS `ecf` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `ecf`;

-- --------------------------------------------------------

--
-- Structure de la table `concerts`
--

DROP TABLE IF EXISTS `concerts`;
CREATE TABLE `concerts` (
  `id` smallint(5) NOT NULL,
  `date_concert` date NOT NULL,
  `note` smallint(1) NOT NULL DEFAULT 5,
  `id_lieu` smallint(3) NOT NULL,
  `id_groupe` smallint(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `concerts`
--

INSERT INTO `concerts` (`id`, `date_concert`, `note`, `id_lieu`, `id_groupe`) VALUES
(1, '2019-11-10', 4, 5, 1),
(3, '2019-11-15', 4, 5, 3),
(6, '2019-11-15', 4, 5, 4),
(9, '2021-03-25', 4, 5, 4),
(31, '2021-01-25', 4, 7, 5),
(32, '2021-01-25', 5, 6, 5),
(33, '2021-01-26', 5, 8, 6);

-- --------------------------------------------------------

--
-- Structure de la table `groupes`
--

DROP TABLE IF EXISTS `groupes`;
CREATE TABLE `groupes` (
  `id` smallint(3) NOT NULL,
  `nom_groupe` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `groupes`
--

INSERT INTO `groupes` (`id`, `nom_groupe`) VALUES
(1, 'Dropkick Murphys'),
(2, 'Flogging Molly'),
(3, 'The Rumjacks'),
(4, 'Fiddlers\'s green'),
(5, 'Joe Bonamassa'),
(6, 'Joe Satriani');

-- --------------------------------------------------------

--
-- Structure de la table `lieux`
--

DROP TABLE IF EXISTS `lieux`;
CREATE TABLE `lieux` (
  `id` smallint(3) NOT NULL,
  `salle_concert` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `lieux`
--

INSERT INTO `lieux` (`id`, `salle_concert`) VALUES
(5, 'La Cigalle'),
(6, 'Le Bataclan'),
(7, 'Le Trianon'),
(8, 'La Boule Noire');

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `vue_concerts`
-- (Voir ci-dessous la vue réelle)
--
DROP VIEW IF EXISTS `vue_concerts`;
CREATE TABLE `vue_concerts` (
`Id` smallint(5)
,`Date` date
,`Salle` varchar(50)
,`Groupe` varchar(50)
,`Note` smallint(1)
);

-- --------------------------------------------------------

--
-- Structure de la vue `vue_concerts`
--
DROP TABLE IF EXISTS `vue_concerts`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vue_concerts`  AS  select `c`.`id` AS `Id`,`c`.`date_concert` AS `Date`,`l`.`salle_concert` AS `Salle`,`g`.`nom_groupe` AS `Groupe`,`c`.`note` AS `Note` from ((`concerts` `c` join `groupes` `g` on(`c`.`id_groupe` = `g`.`id`)) join `lieux` `l` on(`c`.`id_lieu` = `l`.`id`)) ;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `concerts`
--
ALTER TABLE `concerts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_groupes` (`id_groupe`),
  ADD KEY `FK_lieux` (`id_lieu`);

--
-- Index pour la table `groupes`
--
ALTER TABLE `groupes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `lieux`
--
ALTER TABLE `lieux`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `concerts`
--
ALTER TABLE `concerts`
  MODIFY `id` smallint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT pour la table `groupes`
--
ALTER TABLE `groupes`
  MODIFY `id` smallint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `lieux`
--
ALTER TABLE `lieux`
  MODIFY `id` smallint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `concerts`
--
ALTER TABLE `concerts`
  ADD CONSTRAINT `FK_groupes` FOREIGN KEY (`id_groupe`) REFERENCES `groupes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_lieux` FOREIGN KEY (`id_lieu`) REFERENCES `lieux` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;