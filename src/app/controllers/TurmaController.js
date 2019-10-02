import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';
import Turma from '../models/Turma';

class TurmaController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const turmas = await Turma.findAll({
      atributes: ['id', 'nome_turma'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'user',
          include: [
            {
              model: File,
              as: 'avatar',
              atributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });
    return res.json(turmas);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome_turma: Yup.string().required(),
      course: Yup.string().required(),
      topic: Yup.string().required(),
      period: Yup.string().required(),
      days: Yup.string().required(),
      user_id: Yup.number().required(),
      user_teacher: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      nome_turma,
      course,
      topic,
      period,
      days,
      user_id,
      user_teacher,
    } = req.body;

    const isTeacher = await User.findOne({
      where: { id: user_teacher, provider: true },
    });

    if (!isTeacher) {
      return res.status(401).json({ error: 'Only teachers create classes' });
    }

    const turma = await Turma.create({
      nome_turma,
      course,
      topic,
      period,
      days,
      user_id,
      user_teacher: req.userId,
    });

    return res.json(turma);
  }
}

export default new TurmaController();
