package com.project.jt.EventEase.Service;

import com.project.jt.EventEase.Dao.StudentDao;
import com.project.jt.EventEase.Entity.Student;
import com.project.jt.EventEase.Entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Service
public class StudentServiceImpl implements StudentService {
    private static final Logger logger = LoggerFactory.getLogger(StudentServiceImpl.class);

    @Autowired
    private StudentDao studentDao;

    @Autowired
    private UserService userService;

    // We need the EntityManager so that Spring Data's save() will behave like a merge
    @PersistenceContext
    private EntityManager em;

    @Override
    public Student saveStudent(Student student) {
        // Directly save whole Student entity (assumed to include username, password, email, etc.)
        return studentDao.save(student);
    }






    @Override
    @Transactional(readOnly = true)
    public Optional<Student> getStudentById(Long id) {
        return studentDao.findById(id);
    }
    @Override
    @Transactional(readOnly = true)
    public List<Student> getAllStudents() {
        return studentDao.findAll();
    }
    @Override
    @Transactional
    public Student updateStudent(Long id, Student student) {
        return studentDao.findById(id)
                .map(existingStudent -> {
                    student.setId(id);
                    return studentDao.save(student);
                })
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }
    @Override
    @Transactional
    public void deleteStudent(Long id) {
        studentDao.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Student> findByUsername(String username) {
        return studentDao.findByUsername(username);
    }


    // … the rest of your methods stay unchanged …
}
