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
import { useEffect, useState, useRef } from 'react';
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
	const [isFormOpen, setIsOpen] = useState(false);
	const [wantedArticleState, setWantedArticleState] = useState(articleState);

	const rootRef = useRef<HTMLDivElement | null>(null);

	const handleReset = () => {
		setWantedArticleState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	useEffect(() => {
		if (!isFormOpen) return;
		const handleOverlay = (event: MouseEvent) => {
			if (
				event.target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		window.addEventListener('mousedown', handleOverlay);
		return () => {
			window.removeEventListener('mousedown', handleOverlay);
		};
	}, [isFormOpen, rootRef]);

	return (
		<div ref={rootRef}>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => {
					setIsOpen(!isFormOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, isFormOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						setArticleState(wantedArticleState);
					}}
					onReset={handleReset}>
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
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
