import User from '../models/User';
import File from '../models/File';

class TeacherController {
  async index(req, res) {
    const teachers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(teachers);
  }
}

export default new TeacherController();
