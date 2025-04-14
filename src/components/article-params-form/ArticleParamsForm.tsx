import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
}

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [wantedArticleState, setWantedArticleState] = useState(articleState);
	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						setArticleState(wantedArticleState);
					}}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={wantedArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(selected) => {
							setWantedArticleState({
								...wantedArticleState,
								fontFamilyOption: selected,
							});
						}}></Select>

					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={wantedArticleState.fontSizeOption}
						title='Размер шрифта'
						onChange={(selected) => {
							setWantedArticleState({
								...wantedArticleState,
								fontSizeOption: selected,
							});
						}}></RadioGroup>

					<Select
						selected={wantedArticleState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(selected) => {
							setWantedArticleState({
								...wantedArticleState,
								fontColor: selected,
							});
						}}></Select>

					<Separator />

					<Select
						selected={wantedArticleState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(selected) => {
							setWantedArticleState({
								...wantedArticleState,
								backgroundColor: selected,
							});
						}}></Select>

					<Select
						selected={wantedArticleState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(selected) => {
							setWantedArticleState({
								...wantedArticleState,
								contentWidth: selected,
							});
						}}></Select>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								setWantedArticleState(defaultArticleState);
								setArticleState(defaultArticleState);
							}}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
