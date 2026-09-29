import express from 'express';
import { COURSES_DATA } from '../../src/data/coursesData.js';
import { db } from '../config/db.js';

const router = express.Router();

// Get all courses (Catalog view)
router.get('/', (req, res) => {
  const catalog = COURSES_DATA.map((c) => ({
    id: c.id,
    title: c.title,
    category: c.category,
    badge: c.badge,
    rating: c.rating,
    reviewsCount: c.reviewsCount,
    studentsCount: c.studentsCount,
    duration: c.duration,
    level: c.level,
    instructor: c.instructor,
    thumbnail: c.thumbnail,
    description: c.description,
    pricing: c.pricing,
    lecturesCount: c.lectures.length,
    notesCount: c.notes.length,
    questionsCount: c.practiceSheet.totalQuestions
  }));

  return res.json({ success: true, count: catalog.length, courses: catalog });
});

// Get single course by ID
router.get('/:id', async (req, res) => {
  const course = COURSES_DATA.find((c) => c.id === req.params.id);
  if (!course) {
    return res.status(404).json({ success: false, message: 'Course not found.' });
  }

  const userEmail = req.query.email || '';
  const unlocked = userEmail ? await db.getUserUnlockedSheets(userEmail) : [];
  const isSheetUnlocked = unlocked.includes(course.id);

  // If sheet is not unlocked, mask full solutions of non-preview questions for security
  const safePracticeSheet = {
    ...course.practiceSheet,
    questions: course.practiceSheet.questions.map((q) => {
      if (isSheetUnlocked || q.isFreePreview) {
        return q;
      }
      return {
        ...q,
        solutions: {
          cpp: '// [Locked Content] Complete multi-language code solutions unlocked upon purchasing sheet.',
          python: '# [Locked Content] Complete multi-language code solutions unlocked upon purchasing sheet.',
          java: '// [Locked Content] Complete multi-language code solutions unlocked upon purchasing sheet.'
        }
      };
    })
  };

  return res.json({
    success: true,
    course: {
      ...course,
      practiceSheet: safePracticeSheet,
      isUnlocked: isSheetUnlocked
    }
  });
});

export default router;
